import { effect } from "../effect"
import { ref } from "../ref"

describe('ref', () => {
	it('happy path', () => {
		const a = ref(1)

		expect(a.value).toBe(1)
	})

	it('should be reactive', () => {
		const a = ref(1)
		let dummy
		let calls = 0
		effect(() => {
			calls++
			dummy = a.value
		})

		expect(calls).toBe(1)
		expect(dummy).toBe(1)

		a.value = 2
		expect(calls).toBe(2)
		expect(dummy).toBe(2)

		// 值未变，不该触发依赖
		a.value = 2
		expect(calls).toBe(2)
		expect(dummy).toBe(2)
	})

	it('should make nested properties reactive', () => {
		const origin = {
			age: 1
		}
		const user = ref(origin)
		let dummy
		let calls = 0

		effect(() => {
			calls++
			dummy = user.value.age
		})

		expect(dummy).toBe(1)
		user.value.age = 2
		expect(dummy).toBe(2)

		// 测试 赋值同一个对象是否会触发依赖
		user.value = origin
		expect(calls).toBe(2)
	})
})
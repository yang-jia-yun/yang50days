import { effect } from "../effect"
import { reactive } from "../reactive"
import { isRef, ref, unRef, proxyRefs } from "../ref"

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

	it('isRef', () => {
		const a = ref(1)
		const user = reactive({
			age: 1
		})

		expect(isRef(a)).toBe(true)
		expect(isRef(1)).toBe(false)
		expect(isRef(user)).toBe(false)
	})

	it('unRef', () => {
		const a = ref(1)

		expect(unRef(a)).toBe(1)
		expect(unRef(1)).toBe(1)
	})

	it('proxyRefs', () => {
		const user = {
			age: ref(21),
			name: 'buer'
		}

		// 可跳过 .value 直接读取属性值
		const proxyUser = proxyRefs(user)

		expect(user.age.value).toBe(21)
		expect(proxyUser.age).toBe(21)

		// 设置值的情况

		proxyUser.age = 22
		expect(user.age.value).toBe(22)
		expect(proxyUser.age).toBe(22)

		proxyUser.age = ref(23)
		expect(user.age.value).toBe(23)
		expect(proxyUser.age).toBe(23)
	})
})
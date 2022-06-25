import { computed } from "../computed"
import { reactive } from "../reactive"

describe('computed', () => {
	it('happy path', () => {
		const user = reactive({
			age: 1
		})

		const age = computed(() => {
			return user.age
		})


		expect(age.value).toBe(1)
	})

	it('should compute lazily', () => {
		const user = reactive({
			age: 1
		})

		const getter = jest.fn(() => {
			return user.age
		})

		const cValue = computed(getter)

		// 未发生读取操作，不会被调用
		expect(getter).not.toBeCalled()

		// 首次读取，getter 被调用
		expect(cValue.value).toBe(1)
		expect(getter).toBeCalledTimes(1)
		// 值未变，再次读取，getter 不会被调用
		expect(cValue.value).toBe(1)
		expect(getter).toBeCalledTimes(1)

		// 值修改，未获取，不会触发 getter
		user.age = 2
		expect(getter).toBeCalledTimes(1)

		// 获取值，此时getter会被调用
		expect(cValue.value).toBe(2)
		expect(getter).toBeCalledTimes(2)

		// 再次获取，值未变，读取缓存
		cValue.value
		expect(getter).toBeCalledTimes(2)

	})
})
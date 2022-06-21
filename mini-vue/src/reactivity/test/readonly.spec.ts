import { isReadonly, readonly } from "../reactive"

describe('readonly', () => {
	it('happy path', () => {
		const original = { age: 10 }
		const wrapped = readonly({
			age: 10
		})

		expect(wrapped).not.toBe(original)
		expect(wrapped.age).toBe(10)

		expect(isReadonly(wrapped)).toBe(true)
		expect(isReadonly(original)).toBe(false)
	})

	it('warn when use set', () => {
		// mock 调试
		console.warn = jest.fn()

		const user = readonly({ age: 20 })

		user.age = 12

		expect(console.warn).toBeCalled()
	})

	it('nested obj is readonly obj', () => {
		const user = readonly({
			age: 1,
			info: {
				sex: 1
			}
		})

		expect(isReadonly(user)).toBe(true)
		expect(isReadonly(user.info)).toBe(true)

		user.info.sex = 2
		expect(user.info.sex).toBe(1)
	})
})
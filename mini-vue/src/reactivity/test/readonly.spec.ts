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
})
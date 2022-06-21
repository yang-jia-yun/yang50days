import { isReadonly, shallowReadonly } from "../reactive"

describe('shallowReadonly', () => {
	it('happy path', () => {
		const user = shallowReadonly({
			age: 1,
			parent: {
				id: 1
			}
		})

		expect(isReadonly(user)).toBe(true)
		expect(isReadonly(user.parent)).toBe(false)

		user.parent.id = 2

		expect(user.parent.id).toBe(2)
	})

	it('warn when use set', () => {
		// mock 调试
		console.warn = jest.fn()

		const user = shallowReadonly({ age: 20, info: { id: 1 } })

		user.age = 12

		expect(console.warn).toBeCalled()
	})
})
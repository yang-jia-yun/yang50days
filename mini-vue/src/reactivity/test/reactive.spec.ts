import { isReactive, reactive } from '../reactive'

describe('reactive tets', () => {
	// test('main path', () => {
	// 	expect(1).toBe(1)
	// 	expect(reactive(1, 2)).toBe(3)
	// })

	it('happy path', () => {
		const original = {
			age: 1
		}
		const observed = reactive(original)

		expect(observed).not.toBe(original)
		expect(observed.age).toBe(1)
		expect(isReactive(observed)).toBe(true)
		expect(isReactive(original)).toBe(false)
	})

	it('nested obj is reactive obj', () => {
		const user = reactive({
			age: 1,
			info: {
				sex: 1
			}
		})

		expect(isReactive(user)).toBe(true)
		expect(isReactive(user.info)).toBe(true)
	})
})

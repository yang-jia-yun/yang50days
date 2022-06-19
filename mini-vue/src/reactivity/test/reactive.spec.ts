import { reactive } from '../reactive'

describe('reactive tets', () => {
	test('main path', () => {
		expect(1).toBe(1)
		expect(reactive(1, 2)).toBe(3)
	})
})

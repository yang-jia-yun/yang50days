import { effect } from '../effect'
import { reactive } from '../reactive'

describe('effect', () => {
	it('happy path', () => {
		const user = reactive({
			age: 10
		})

		let nextAge

		effect(() => {
			nextAge = user.age + 1
		})

		expect(nextAge).toBe(11)

		// update
		user.age++
		expect(nextAge).toBe(12)
	})

	it('should return runner when call effect', () => {

		// effect(fn) -> runner() -> fn -> fn()
		let foo = 10

		const runner = effect(() => {
			foo++
			console.log('foo ++')
			return 'foo'
		})

		expect(foo).toBe(11)
		const res = runner()
		expect(foo).toBe(12)
		expect(res).toBe('foo')
	})
})
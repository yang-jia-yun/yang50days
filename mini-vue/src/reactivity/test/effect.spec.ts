import { effect, stop } from '../effect'
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
			return 'foo'
		})

		expect(foo).toBe(11)
		const res = runner()
		expect(foo).toBe(12)
		expect(res).toBe('foo')
	})

	it('scheduler', () => {
		let dummy
		let run

		// 定义一个scheduler，将被延迟执行
		const scheduler = jest.fn(() => {
			run = runner
		})

		const obj = reactive({ foo: 1 })
		const runner = effect(
			() => {
				dummy = obj.foo
			},
			{
				scheduler
			}
		)
		// 首次执行effect时，scheduler 不会被调用
		expect(scheduler).not.toHaveBeenCalled()
		expect(dummy).toBe(1)

		// 首次调用scheduler
		obj.foo++
		expect(scheduler).toHaveBeenCalledTimes(1)

		// 值修改并不会触发 fn 函数运行
		expect(dummy).toBe(1)
		// 调用run （scheduler调用时run已经被赋值）
		run()

		expect(dummy).toBe(2)

	})

	it('stop', () => {
		const props = reactive({ foo: 1 })
		let dummy

		const runner = effect(() => {
			dummy = props.foo
		})

		expect(dummy).toBe(1)

		// props.foo++
		props.foo = 2
		expect(dummy).toBe(2)

		// 暂停 runner，effect 回调不会被执行
		stop(runner)

		// props.foo++ // 3 测试失败
		props.foo = 3  // 测试通过
		expect(dummy).toBe(2)

		// 解除 暂停状态，fn 正常运行
		runner()
		expect(dummy).toBe(3)
	})
})
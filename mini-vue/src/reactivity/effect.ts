class ReactiveEffect {
	private _fn: Function
	deps = []
	active = true

	// scheduler 为可选参数，不一定存在 使用 public scheduler?
	// 代表着如果存在 scheduler ，则编译时会 自动绑定 在实例上？？
	constructor(fn: Function, public scheduler?) {
		this._fn = fn
	}
	run() {
		activeEffect = this

		if (!this.active) this.active = true // 被暂停状态下，恢复stop状态

		return this._fn()
	}
	stop() {
		// 应该清空对应 dep
		// cleanEffects(this)

		// 出于性能考虑,添加状态控制
		if (this.active) {
			cleanEffects(this)
			this.active = false
		}
	}
}

const targetMaps = new Map()
export function track(target, key) {
	let depsMap = targetMaps.get(target)

	if (!depsMap) {
		depsMap = new Map()
		targetMaps.set(target, depsMap)
	}

	let dep = depsMap.get(key)
	if (!dep) {
		dep = new Set()
		depsMap.set(key, dep)
	}

	// 仅在 get 阶段，不存在 activeEffect 对象
	if (!activeEffect) return

	dep.add(activeEffect)

	// 收集dep，用于stop
	activeEffect.deps.push(dep)
}

export function trigger(target, key) {
	let deps = targetMaps.get(target)
	let effects = deps.get(key)

	effects.forEach(effect => {
		// 根据是否存在 scheduler 判断应该执行的fn
		if (effect.scheduler) {
			effect.scheduler()
		} else {
			effect.run()
		}
	})
}

export function stop(runner) {
	// runner 上绑定了对应 实例
	runner.effect.stop()
}


let activeEffect
export function effect(fn: Function, options: any = {}) {
	// 创建一个依赖
	const _effect = new ReactiveEffect(fn, options.scheduler)
	_effect.run()

	const runner: any = _effect.run.bind(_effect)
	runner.effect = _effect // 在实例上绑定 本身

	return runner
}

function cleanEffects(effect) {
	effect.deps.forEach((dep: any) => {
		// dep 是一个 Set 集合
		dep.delete(effect)
	})
}

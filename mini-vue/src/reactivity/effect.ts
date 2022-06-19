class ReactiveEffect {
	private _fn: Function
	deps = []

	// scheduler 为可选参数，不一定存在 使用 public scheduler?
	// 代表着如果存在 scheduler ，则编译时会 自动绑定 在实例上？？
	constructor(fn: Function, public scheduler?) {
		this._fn = fn
	}
	run() {
		activeEffect = this
		return this._fn()
	}
	stop() {
		// 应该清空对应 dep
		cleanEffects(this)

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

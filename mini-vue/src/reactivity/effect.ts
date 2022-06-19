class ReactiveEffect {
	private _fn: Function

	// scheduler 为可选参数，不一定存在 使用 public scheduler?
	// 代表着如果存在 scheduler ，则编译时会 自动绑定 在实例上？？
	constructor(fn: Function, public scheduler?) {
		this._fn = fn
	}
	run() {
		activeEffect = this
		return this._fn()
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


let activeEffect
export function effect(fn: Function, options = {}) {
	// 创建一个依赖
	const _effect = new ReactiveEffect(fn, options.scheduler)

	_effect.run()

	return _effect.run.bind(_effect)
}
class ReactiveEffect {
	private _fn: Function

	constructor(fn: Function) {
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

	effects.forEach(effect => effect.run())
}


let activeEffect
export function effect(fn: Function) {
	// 创建一个依赖
	const _effect = new ReactiveEffect(fn)

	_effect.run()

	return _effect.run.bind(_effect)
}
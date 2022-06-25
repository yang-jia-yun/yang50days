import { extend } from '../shared'

let activeEffect
let shouldTrack
export class ReactiveEffect {
	private _fn: Function
	deps = []
	active = true
	onStop?: () => void

	// scheduler 为可选参数，不一定存在 使用 public scheduler?
	// 代表着如果存在 scheduler ，则编译时会 自动绑定 在实例上？？
	constructor(fn: Function, public scheduler?) {
		this._fn = fn
	}
	run() {

		// if (!this.active) this.active = true // 被暂停状态下，恢复stop状态
		if (!this.active) {
			shouldTrack = false
			return this._fn()
		}

		// 仅需要收集的情况下赋值
		activeEffect = this

		// 打开开关，触发依赖收集
		shouldTrack = true
		const res = this._fn()
		// 关闭，恢复默认状态，如果当前被 stop 了，则不会触发依赖的收集
		shouldTrack = null
		return res
	}
	stop() {
		// 应该清空对应 dep
		// cleanEffects(this)

		// 出于性能考虑,添加状态控制
		if (this.active) {
			cleanEffects(this)
			if (this.onStop) {
				this.onStop()
			}
			this.active = false
		}
	}
}

const targetMaps = new Map()
export function track(target, key) {
	// // 被stop了，则不触发收集
	// if (!shouldTrack) return
	// // 仅在 get 阶段，不存在 activeEffect 对象
	// if (!activeEffect) return

	if (!isTracking()) return

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

	trackEffects(dep)

	// // 添加判断，避免重复收集依赖
	// if (dep.has(activeEffect)) return

	// dep.add(activeEffect)
	// // 收集dep，用于stop
	// activeEffect.deps.push(dep)
}

// 重构，方便外部调用
export function trackEffects(dep) {

	// 添加判断，避免重复收集依赖
	if (dep.has(activeEffect)) return

	dep.add(activeEffect)
	// 收集dep，用于stop
	activeEffect.deps.push(dep)
}

export function isTracking() {
	// 需要判断 shouldTrack !== undefined ?
	return activeEffect && shouldTrack
}

export function trigger(target, key) {
	let deps = targetMaps.get(target)
	let dep = deps.get(key)

	triggerEffects(dep)

	// dep.forEach(effect => {
	// 	// 根据是否存在 scheduler 判断应该执行的fn
	// 	if (effect.scheduler) {
	// 		effect.scheduler()
	// 	} else {
	// 		effect.run()
	// 	}
	// })
}

export function triggerEffects(dep) {
	for (const effect of dep) {
		// 根据是否存在 scheduler 判断应该执行的fn
		if (effect.scheduler) {
			effect.scheduler()
		} else {
			effect.run()
		}
	}
}

export function stop(runner) {
	// runner 上绑定了对应 实例
	runner.effect.stop()
}


export function effect(fn: Function, options: any = {}) {
	// 创建一个依赖
	const _effect = new ReactiveEffect(fn, options.scheduler)
	// _effect.onStop = options.onStop
	// Object.assign(_effect, options)
	extend(_effect, options)
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

	// 相关依赖删除后，可以清空数组
	effect.deps.length = 0
}

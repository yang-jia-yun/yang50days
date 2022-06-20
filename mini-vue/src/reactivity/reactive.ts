import { track, trigger } from "./effect"

export function reactive(raw) {
	return new Proxy(raw, {
		get(target, key) {
			const res = Reflect.get(target, key)

			// TODO 依赖收集 track
			track(target, key)
			return res
		},
		set(target, key, val) {
			const res = Reflect.set(target, key, val)

			// TODO 触发依赖 trigger
			trigger(target, key)
			return res
		}
	})
}

export function readonly(raw) {
	return new Proxy(raw, {
		get(target, key) {
			// 只读，不需要收集依赖
			return Reflect.get(target, key)
		},
		set(target, key, value) {
			// 只读，当尝试修改值时 应该 发出警告
			console.warn(`current target ${target} is readonly, can't change the props`)
			return true
		}
	})
}


import { track, trigger } from "./effect"
import { reactive, ReactiveFlags, readonly } from "./reactive"
import { isObject, extend } from '../shared'

// 实例化之后缓存，避免每次包装对象时都创建一个函数，提高性能
const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)


function createGetter(isReadonly = false, shallow = false) {
	return (target, key) => {
		if (key === ReactiveFlags.IS_REACTIVE) {
			return !isReadonly
		} else if (key === ReactiveFlags.IS_READONLY) {
			return isReadonly
		}

		const res = Reflect.get(target, key)

		if (shallow) return res

		// 递归处理对象元素为响应对象
		if (isObject(res)) {
			return isReadonly ? readonly(res) : reactive(res)
		}

		if (!isReadonly) {
			// 依赖收集 track
			track(target, key)
		}
		return res
	}
}

function createSetter() {
	return (target, key, val) => {
		const res = Reflect.set(target, key, val)
		// 触发依赖 trigger
		trigger(target, key)
		return res
	}
}

export const mutableHandler = {
	// get: createGetter(),
	// set: createSetter(),

	get,
	set,
}

export const readonlyHandler = {
	// get: createGetter(true),
	get: readonlyGet,
	set(target, key, value) {
		// 只读，当尝试修改值时 应该 发出警告
		console.warn(`current target ${target} is readonly, can't change the props`)
		return true
	}
}

export const shallowReadonlyHandler = extend({}, readonlyHandler, {
	get: shallowReadonlyGet
})

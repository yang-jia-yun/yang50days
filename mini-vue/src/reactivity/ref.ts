import { isTracking, trackEffects, triggerEffects } from "./effect"
import { hasChanged, isObject } from '../shared'
import { reactive } from "./reactive"

class RefImpl {
	private _value: any
	private dep = new Set()
	private _originValue: any
	private __v_is_ref = true
	constructor(value) {
		// 单值
		// this._value = value

		this._originValue = value
		// this._value = isObject(value) ? reactive(value) : value
		this._value = convert(value)
	}

	get value() {
		// 收集依赖
		// if (isTracking()) {
		// 	trackEffects(this.dep)
		// }
		trackRefValue(this) // 这一步重构是否真的有必要？
		return this._value
	}

	set value(newValue) {
		// if (Object.is(this._value, newValue)) return
		// if (hasChanged(this._value, newValue)) {
		// 代理值为对象时，已经被转化为 reactive 带来对象，两个值肯定不相等，需要对比原始值
		if (hasChanged(this._originValue, newValue)) {

			this._originValue = newValue

			// this._value = newValue
			// 新值如果也是对象，应与初始化流程一致
			// this._value = isObject(newValue) ? reactive(newValue) : newValue
			this._value = convert(newValue)
			// 值修改，触发依赖
			triggerEffects(this.dep)
		}
	}
}

// 转换
function convert(value) {
	return isObject(value) ? reactive(value) : value
}

function trackRefValue(ref) {
	if (isTracking()) {
		trackEffects(ref.dep)
	}
}

export function ref(value) {
	// 返回一个带有 .value 的对象
	return new RefImpl(value)
}

export function isRef(ref) {
	return !!ref.__v_is_ref
}

export function unRef(ref) {
	// 如果值是 一个 ref 对象，则返回原始值， 否则返回 值本身
	return isRef(ref) ? ref._originValue : ref
}

export function proxyRefs(raw) {
	return new Proxy(raw, {
		get(target, key) {
			// 如果读取的值是一个 ref ，则返回结构后的值
			// 如果值非 ref， 则直接返回，次数可套用 unRef
			return unRef(Reflect.get(target, key))
		},
		set(target, key, value) {
			// 理论上，设置的值都应该直接替换
			// 但是，如果原本的值是一个 ref， 且新的值 非 ref， 则应直接修改 .value
			if (isRef(target[key]) && !isRef(value)) {
				return target[key].value = value
			}
			return Reflect.set(target, key, value)
		}
	})
}
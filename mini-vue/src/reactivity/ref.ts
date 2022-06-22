import { isTracking, trackEffects, triggerEffects } from "./effect"
import { hasChanged, isObject } from '../shared'
import { reactive } from "./reactive"

class RefImpl {
	private _value: any
	private dep = new Set()
	private _originValue: any
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

export function ref(value) {
	// 返回一个带有 .value 的对象
	return new RefImpl(value)
}

function trackRefValue(ref) {
	if (isTracking()) {
		trackEffects(ref.dep)
	}
}

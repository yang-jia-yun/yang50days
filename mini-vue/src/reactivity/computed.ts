import { ReactiveEffect } from "./effect"

class ComputedRefImpl {
	private _getter: any
	private dirty = true
	private _value: any
	private _effect: any
	constructor(getter) {
		this._getter = getter

		// 巧妙利用 底层 ReactiveEffect 实现响应操作
		this._effect = new ReactiveEffect(getter, () => {
			if (!this.dirty) {
				this.dirty = true
			}
		})
	}

	get value() {
		// 重要的特性之一是，缓存
		if (this.dirty) {
			this.dirty = false
			// this._value = this._getter()
			this._value = this._effect.run()
		}
		return this._value
	}
}

export function computed(getter) {
	return new ComputedRefImpl(getter)
}
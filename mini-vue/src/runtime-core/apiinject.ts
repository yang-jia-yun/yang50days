import { getCurrentInstance } from ".";

export function provide(key, value) {
	const currentInstance: any = getCurrentInstance()

	// 存值 key -> value
	if (currentInstance) {
		let { provides } = currentInstance
		const parentProvides = currentInstance.parent?.provides

		// 修改原型指向
		// TODO 与父级相等，所以可以判定为初始化！why？没想通
		if (provides === parentProvides) {
			provides = currentInstance.provides = Object.create(parentProvides)
		}

		provides[key] = value
	}
}

export function inject(key, defaultValue) {
	// 取值，从父组件获取
	const currentInstance: any = getCurrentInstance()
	if (currentInstance) {
		// if (defaultValue) return defaultValue 憨憨行为
		const parentProvides = currentInstance.parent.provides

		if (key in parentProvides) {
			return parentProvides[key]
			// } else if (defaultValue) { // 走此判断会把 0 等内容过滤掉，导致默认值不正确
		} else if (typeof defaultValue === 'function') {
			return defaultValue()
		}
		return defaultValue
	}
}
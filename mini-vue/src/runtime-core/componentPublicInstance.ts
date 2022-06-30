// const proxyMaps = {
// 	$el: (root) => root.vnode.el
// }

import { hasOwn } from "../shared"

const publicProperiesMap = {
	$el: (i) => i.vnode.el
}

export const PublicInstanceProxyHandlers = {
	get({ _: instance }, key) {
		const { setupState, props } = instance

		if (hasOwn(setupState, key)) {
			return setupState[key]
		}
		if (hasOwn(props, key)) {
			return props[key]
		}
		// if (key in setupState) {
		// 	return setupState[key]
		// }

		// if (key in props) {
		// 	return props[key]
		// }

		// 处理 props的值

		// if (key === '$el') {
		// 	return instance.vnode.el
		// }

		// 还有众多 api，此时可考虑使用 map 映射（策略模式？）

		// if (key in proxyMaps) {
		// 	return proxyMaps[key](instance)
		// }

		// 优化
		const publicGetter = publicProperiesMap[key]
		if (publicGetter) {
			return publicGetter(instance)
		}

		return null
	}
}
// const proxyMaps = {
// 	$el: (root) => root.vnode.el
// }

const publicProperiesMap = {
	$el: (i) => i.vnode.el
}

export const PublicInstanceProxyHandlers = {
	get({ _: instance }, key) {
		const { setupState } = instance

		if (key in setupState) {
			return setupState[key]
		}

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
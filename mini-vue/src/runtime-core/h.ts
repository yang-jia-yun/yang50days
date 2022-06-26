export function h(type, props?, children?) {
	const vnode = {
		type,
		props,
		children,
	}

	return vnode
}
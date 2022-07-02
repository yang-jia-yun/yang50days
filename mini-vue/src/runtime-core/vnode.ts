import { ShapFlags } from "../shared/ShapFlags"

export const Fragment = Symbol('Fragment')

export function createVnode(type, props?, children?) {
	const vnode = {
		type,
		props,
		children,
		shapFlag: getShapFlag(type)
	}

	if (typeof children === 'string') {
		vnode.shapFlag |= ShapFlags.TEXT_CHILDREN
	} else if (Array.isArray(children)) {
		vnode.shapFlag |= ShapFlags.ARRAY_CHILDREN
	}

	// 当前vnode 为组件，并且是一个object，则标记为 slots
	if (vnode.shapFlag & ShapFlags.STATEFUL_COMPONENT) {
		if (typeof children === 'object') {
			vnode.shapFlag |= ShapFlags.SLOT_CHILDREN
		}
	}

	return vnode
}

function getShapFlag(type: any) {
	return typeof type === 'string' ? ShapFlags.ELEMENT : ShapFlags.STATEFUL_COMPONENT
}

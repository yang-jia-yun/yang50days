import { createVnode, Fragment } from "../runtime-core/vnode"

export function renderSlots(slots, name, props = {}) {
	const slot = slots[name]
	if (slot) {
		if (typeof slot === 'function') {
			// 使用div会导致额外多出一层div父级，影响布局
			// return createVnode('div', {}, slot(props))
			return createVnode(Fragment, {}, slot(props))
		}
	}
	// return []
}
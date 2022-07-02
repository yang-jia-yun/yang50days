import { ShapFlags } from "../shared/ShapFlags"

export function initSlots(instance, children) {
	// 支持 单个及数组形式
	// instance.slots = Array.isArray(children) ? children : [children]

	// const slots = {}
	// for (const key in children) {
	// 	const value = children[key]
	// 	slots[key] = normalizeValue(value)
	// }

	// instance.slots = slots
	// normalizeObjectSlots(children, instance.slots)

	const { vnode } = instance
	if (vnode.shapFlag & ShapFlags.SLOT_CHILDREN) {
		normalizeObjectSlots(children, instance.slots)
	}
}

function normalizeObjectSlots(children, slots) {
	for (const key in children) {
		const value = children[key]
		slots[key] = (props) => normalizeSlotValue(value(props))
	}
}

function normalizeSlotValue(value) {
	return Array.isArray(value) ? value : [value]
}
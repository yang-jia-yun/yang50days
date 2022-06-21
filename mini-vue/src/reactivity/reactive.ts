import { mutableHandler, readonlyHandler, shallowReadonlyHandler } from "./baseHandlers"

export const enum ReactiveFlags {
	IS_REACTIVE = '__v_is_reactive',
	IS_READONLY = '__v_is_readonly'
}

function createActiveObject(raw, baseHandler) {
	return new Proxy(raw, baseHandler)
}

export function reactive(raw) {
	return createActiveObject(raw, mutableHandler)
}

export function readonly(raw) {
	return createActiveObject(raw, readonlyHandler)
}

export function shallowReadonly(raw) {
	return createActiveObject(raw, shallowReadonlyHandler)
}


export function isReactive(value) {
	return !!value[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(value) {
	return !!value[ReactiveFlags.IS_READONLY]
}

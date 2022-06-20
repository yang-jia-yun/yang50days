import { mutableHandler, readonlyHandler } from "./baseHandlers"

function createActiveObject(raw, baseHandler) {
	return new Proxy(raw, baseHandler)
}

export function reactive(raw) {
	return createActiveObject(raw, mutableHandler)
}

export function readonly(raw) {
	return createActiveObject(raw, readonlyHandler)
}


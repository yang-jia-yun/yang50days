export const extend = Object.assign

export function isObject(value) {
	return value && typeof value === 'object'
}

export function hasChanged(val, newValue) {
	return !Object.is(val, newValue)
}

export function hasOwn(val, key) {
	return Object.prototype.hasOwnProperty.call(val, key)
}

export const extend = Object.assign

export function isObject(value) {
	return value && typeof value === 'object'
}

export function hasChanged(val, newValue) {
	return !Object.is(val, newValue)
}

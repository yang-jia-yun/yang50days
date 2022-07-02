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

// 转换 xx-xx 为 驼峰
export function camelize(str: string) {
	return str.replace(/-(\w)/g, (_, target: string) => {
		return target ? target.toUpperCase() : ''
	})
}

// 首字母大写
function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}


export function toHandleKey(str: string) {
	return 'on' + capitalize(str)
}

import { camelize, toHandleKey } from "../shared"

export function emit(instance, event, ...args) {
	const { props } = instance

	// TODO TPP?

	// function capitalize(str: string) {
	// 	return str.charAt(0).toUpperCase() + str.slice(1)
	// }
	// function handleKeyName(str: string) {
	// 	return 'on' + capitalize(str)
	// }

	// const handleName = props['onAdd']
	const handleName = toHandleKey(camelize(event))
	// console.log('emit name => ', handleName)
	const handler = props[handleName]
	handler && handler(...args)
}
import { h, getCurrentInstance } from '../../lib/mini-vue.esm.js'

export default {
	name: 'Foo',
	setup() {
		const instance = getCurrentInstance()
		console.log(instance)
	},
	render() {
		return h('div', {}, 'foo')
	},
}

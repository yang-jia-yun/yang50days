import {
	h,
	getCurrentInstance,
	createTextVNode,
} from '../../lib/mini-vue.esm.js'
import Foo from './Foo.js'

export default {
	name: 'APP',
	render() {
		const foo = h(Foo, {}, h('p', {}, '123'))
		return h('div', {}, [createTextVNode('current instance demo'), foo])
	},
	setup() {
		const instance = getCurrentInstance()
		console.log(instance)
	},
}

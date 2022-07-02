import { h, createTextVNode } from '../../lib/mini-vue.esm.js'
import Foo from './Foo.js'

export default {
	render() {
		const App = h('div', {}, 'App')
		// 1. 实现支持单个slot
		// const foo = h(Foo, {}, h('p', {}, '123'))
		// 2. 实现支持多个slot
		// const foo = h(Foo, {}, [h('p', {}, '123'), h('p', {}, '456')])
		// 3. 实现支持 object slot （具名插槽）
		// const foo = h(
		// 	Foo,
		// 	{},
		// 	{
		// 		header: h('p', {}, '123'),
		// 		footer: h('p', {}, '456'),
		// 	}
		// )
		// 4. 实现插槽作用域
		const foo = h(
			Foo,
			{},
			{
				header: ({ age }) => [
					h('p', {}, '123, slot param age = ' + age),
					createTextVNode('我是text节点'),
				],
				footer: () => h('p', {}, '456'),
			}
		)

		return h('div', {}, [App, foo])
	},
	setup() {},
}

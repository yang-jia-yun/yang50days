import { h } from '../../lib/mini-vue.esm.js'
import Foo from './Foo.js'

// 先通过全局对象代理组件，方便调试
window.self = null
export default {
	// 暂时默认用户必须使用render函数（不处理.vue模板）
	render() {
		window.self = this
		return h(
			'div',
			{
				id: 'child',
				onClick() {
					console.log('click me')
				},
				onMouseDown() {
					console.log('onmousedown')
				},
			},
			// 1. 常规this √
			// 2. this.$el 如何实现
			// 'hello, ' + this.msg
			// 多个children 的情况
			// [
			// 	h('p', { class: 'red', style: 'color: red;' }, 'first p'),
			// 	h('p', { class: 'green', style: 'color: green;' }, 'second p'),
			// ]
			[h('p', {}, 'hello' + this.msg), h(Foo, { count: 666 })]
		)
	},
	setup() {
		return {
			msg: 'mini-vue test',
		}
	},
}

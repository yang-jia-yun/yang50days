import { h } from '../../lib/mini-vue.esm.js'

export default {
	// 暂时默认用户必须使用render函数（不处理.vue模板）
	render() {
		return h(
			'div',
			{ id: 'child' },
			// 'hello, ' + this.msg
			// 多个children 的情况
			[
				h('p', { class: 'red', style: 'color: red;' }, 'first p'),
				h('p', { class: 'green', style: 'color: green;' }, 'second p'),
			]
		)
	},
	setup() {
		return {
			msg: 'mini-vue',
		}
	},
}

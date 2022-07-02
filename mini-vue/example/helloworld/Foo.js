import { h } from '../../lib/mini-vue.esm.js'

export default {
	setup(props, { emit }) {
		// props 值的特点：0: 可以通过setup传入 1. 可以直接读取 2. 只读的（浅层）
		console.log('props', props)
		// 此处应触发警告
		props.count++

		function emitAdd() {
			console.log('inner click')
			emit('add', { id: 10 })
			emit('add-foo')
		}
		return {
			emitAdd,
		}
	},
	render() {
		const btn = h('button', { onClick: this.emitAdd }, 'emit Add')
		return h(
			'div',
			{
				id: 'testProps',
			},
			[h('p', {}, 'props.count: ' + this.count), btn]
		)
	},
}

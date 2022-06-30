import { h } from '../../lib/mini-vue.esm.js'

export default {
	setup(props) {
		// props 值的特点：0: 可以通过setup传入 1. 可以直接读取 2. 只读的（浅层）
		console.log(props)

		// 此处应触发警告
		props.count++
	},
	render() {
		return h(
			'div',
			{
				id: 'testProps',
			},
			'props.count: ' + this.count
		)
	},
}

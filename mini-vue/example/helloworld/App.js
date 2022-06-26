export default {
	// 暂时默认用户必须使用render函数（不处理.vue模板）
	render() {
		return h('div', 'hello, ' + this.msg)
	},
	setup() {
		return {
			msg: 'mini-vue',
		}
	},
}

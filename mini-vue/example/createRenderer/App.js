import { h } from '../../lib/mini-vue.esm.js'

export default {
	render() {
		return h('rect', {
			x: this.x,
			y: this.y,
			width: 80,
			height: 80,
		})
	},
	setup() {
		return {
			x: 100,
			y: 100,
		}
	},
}

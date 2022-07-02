import { h, renderSlots } from '../../lib/mini-vue.esm.js'

export default {
	setup() {},
	render() {
		const foo = h('div', {}, 'Foo')
		console.log(this.$slots)

		// return h('div', {}, [foo, this.$slots])
		// return h('div', {}, [foo, renderSlots(this.$slots)])
		const age = 13
		return h('div', {}, [
			renderSlots(this.$slots, 'header', { age }),
			foo,
			renderSlots(this.$slots, 'footer'),
		])
	},
}

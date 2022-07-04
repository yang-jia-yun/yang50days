import { h, provide, inject } from '../../lib/mini-vue.esm.js'

const Provider = {
	name: 'Provider',
	setup() {
		provide('foo', 'fooValue')
	},
	render() {
		return h('div', {}, [h('p', {}, 'povider'), h(ProviderTwo)])
	},
}

const ProviderTwo = {
	name: 'Provider',
	setup() {
		provide('foo', 'fooTwoValue')
		const foo = inject('foo')
		return {
			foo,
		}
	},
	render() {
		return h('div', {}, [
			h('p', {}, 'poviderTwo ===>' + this.foo),
			h(Consumer),
		])
	},
}

const Consumer = {
	name: 'Consumer',
	setup() {
		const foo = inject('foo')
		const baz = inject('baz', 'bazDefault') // 测试 默认值
		const bar = inject('bar', () => 'barDefault') // 测试 函数 默认值
		return {
			foo,
			baz,
			bar,
		}
	},
	render() {
		return h(
			'p',
			{},
			`Consumer ===> ${this.foo} , baz ===> ${this.baz}, bar ===> ${this.bar}`
		)
	},
}

export default {
	name: 'APP',
	render() {
		return h('div', {}, [h(Provider)])
	},
	setup() {
		provide('foo', 'fooValue')
	},
}

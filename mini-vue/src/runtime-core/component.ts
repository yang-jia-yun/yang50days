import { shallowReadonly } from "../reactivity/reactive"
import { emit } from "./componentEmit"
import { initProps } from "./ComponentProps"
import { PublicInstanceProxyHandlers } from "./componentPublicInstance"

export function createComponentInstance(vnode: any) {
	const instance = {
		vnode,
		type: vnode.type,
		setupState: {},// 初始化组件全局状态
		el: null,
		emit: () => { }
	}

	// 用户使用 emit 的时候，是直接传递事件名的，但是调用事件需要依赖与父组件，
	// 所以此处通过 bind 巧妙实现既能访问到instance, 用户也仅需传递 事件名 即可
	instance.emit = emit.bind(null, instance) as any

	return instance
}

export function setupComponent(instance) {
	// TODO 初始化 props
	initProps(instance, instance.vnode.props)
	// TODO 初始化 state
	// initSlots(instance)
	// 初始化有状态的component
	setupStatefulComponent(instance)
}

function setupStatefulComponent(instance) {
	const Component = instance.vnode.type

	const { setup } = Component

	// 构造一个代理对象
	const proxy = new Proxy(
		{ _: instance },
		PublicInstanceProxyHandlers
		// {
		// get(target, key) {
		// 	const { setupState } = instance

		// 	if (key in setupState) {
		// 		return setupState[key]
		// 	}

		// 	if (key === '$el') {
		// 		return instance.vnode.el
		// 	}

		// 	return null
		// },
		// set(target, key, val) {
		// 	const { setupState } = instance

		// 	if (key in setupState) {
		// 		return Reflect.set(setupState, key, val)
		// 	}
		// 	return true
		// }
		// }
	)

	instance.proxy = proxy

	if (setup) {
		const setupResult = setup(shallowReadonly(instance.props), {
			emit: instance.emit
		})
		handleSetupResult(instance, setupResult)
	}

}

function handleSetupResult(instance: any, setupResult) {
	// 判断 setup 的类型
	// TODO function
	// object ，曾直接将 内容挂在到组件实例 上
	if (typeof setupResult === 'object') {
		instance.setupState = setupResult

	}
	// 保证 component 是有状态的（函数组件待处理）
	finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
	//TODO 为何 Component 为 type ？
	const Component = instance.type
	if (Component.render) {
		instance.render = Component.render
	}
}


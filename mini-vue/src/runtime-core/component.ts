export function createComponentInstance(vnode: any) {
	const instance = {
		vnode,
		type: vnode.type,
	}

	return instance
}

export function setupComponent(instance) {
	// TODO 初始化 props
	// initProps(instance)
	// TODO 初始化 state
	// initSlots(instance)
	// 初始化有状态的component
	setupStatefulComponent(instance)
}

function setupStatefulComponent(instance) {
	const Component = instance.vnode.type

	const { setup } = Component

	if (setup) {
		const setupResult = setup()
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


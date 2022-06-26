import { createComponentInstance, setupComponent } from "./component"

export function render(vnode, container) {
	// 执行 patch, 打补丁
	patch(vnode, container)
}

function patch(vnode, container) {
	// 处理 component

	processComponent(vnode, container)
}

function processComponent(vnode: any, container: any) {
	// 挂载 component
	mountComponent(vnode, container)
}

function mountComponent(vnode: any, container: any) {
	const instance = createComponentInstance(vnode)
	setupComponent(instance)
	setupRenderEffect(instance, container)
}

function setupRenderEffect(instance, container) {
	const subTree = instance.render()
	patch(subTree, container)
}

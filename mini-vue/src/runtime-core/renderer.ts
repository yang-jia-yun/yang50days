import { isObject } from '../shared'
import { createComponentInstance, setupComponent } from "./component"

export function render(vnode, container) {
	// 执行 patch, 打补丁
	patch(vnode, container)
}

function patch(vnode, container) {
	// 处理 component
	// 注意：vnode 可能是 一个 element ,需要走另一个流程-初始化 element
	// elememt 是string类型, 正常的 type 应该是一个 vnode 对象
	// 想象入口创建的app，就是传入的 App component， 然后创建 vnode 的第一个参数就是 type
	// console.log(vnode);
	if (typeof vnode.type === 'string') {
		processElement(vnode, container)
	} else {
		processComponent(vnode, container)
	}
}

function processComponent(vnode: any, container: any) {
	// 挂载 component
	mountComponent(vnode, container)
}

function mountComponent(initialVnode: any, container: any) {
	const instance = createComponentInstance(initialVnode)
	setupComponent(instance)
	setupRenderEffect(instance, initialVnode, container)
}

function setupRenderEffect(instance, initialVnode, container) {
	// const subTree = instance.render()
	const { proxy } = instance
	// TODO call的作用是把proxy当作内容的this指向，实现对 setup 里return的值的调用 ？
	const subTree = instance.render.call(proxy)
	patch(subTree, container)

	// instance.vnode.el = subTree.el
	// TODO 节点挂载后才会存在真实节点，此处的问题在于 vnode 貌似可以不传，直接使用 instance.vnode ?
	initialVnode.el = subTree.el
}

function processElement(vnode: any, container: any) {
	mountElement(vnode, container)
}

function mountElement(vnode: any, container: any) {
	// 此时 vnode 的type即为标签类型
	const { type, children, props } = vnode
	// const el = document.createElement(type)
	const el = (vnode.el = document.createElement(type))

	// props 是一个对象
	if (isObject(props)) {
		for (const key in props) {
			el.setAttribute(key, props[key])
		}
	}

	if (typeof children === 'string') {
		el.textContent = children
	} else if (Array.isArray(children)) {
		// 每个 元素都有可能是 element 或者 vnode， 需要调用patch进行对应处理
		// children.forEach(child => patch(child, el))
		mountChildren(vnode, el)
	}

	// 挂载元素
	container.append(el)
}

function mountChildren(vnode: any, container) {
	vnode.children.forEach(child => patch(child, container))
}


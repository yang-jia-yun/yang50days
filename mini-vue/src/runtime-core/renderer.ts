import { isObject } from '../shared'
import { ShapFlags } from '../shared/ShapFlags'
import { createComponentInstance, setupComponent } from "./component"
import { Fragment, TEXT } from './vnode'

export function render(vnode, container, parentComponent) {
	// 执行 patch, 打补丁
	patch(vnode, container, parentComponent)
}

function patch(vnode, container, parentComponent) {
	// 处理 component
	// 注意：vnode 可能是 一个 element ,需要走另一个流程-初始化 element
	// elememt 是string类型, 正常的 type 应该是一个 vnode 对象
	// 想象入口创建的app，就是传入的 App component， 然后创建 vnode 的第一个参数就是 type
	// console.log(vnode);
	const { type, shapFlag } = vnode

	switch (type) {
		case Fragment:
			processFragment(vnode, container, parentComponent)
			break
		case TEXT:
			processText(vnode, container)
			break
		default:
			if (shapFlag & ShapFlags.ELEMENT) {
				processElement(vnode, container, parentComponent)
			} else if (shapFlag & ShapFlags.STATEFUL_COMPONENT) {
				processComponent(vnode, container, parentComponent)
			}
			break
	}
}

function processComponent(vnode: any, container: any, parentComponent) {
	// 挂载 component
	mountComponent(vnode, container, parentComponent)
}

function mountComponent(initialVnode: any, container: any, parentComponent) {
	const instance = createComponentInstance(initialVnode, parentComponent)
	setupComponent(instance)
	setupRenderEffect(instance, initialVnode, container, parentComponent)
}

function setupRenderEffect(instance, initialVnode, container, parentComponent) {
	// const subTree = instance.render()
	const { proxy } = instance
	// TODO call的作用是把proxy当作内容的this指向，实现对 setup 里return的值的调用 ？
	const subTree = instance.render.call(proxy)
	patch(subTree, container, instance)

	// instance.vnode.el = subTree.el
	// TODO 节点挂载后才会存在真实节点，此处的问题在于 vnode 貌似可以不传，直接使用 instance.vnode ?
	initialVnode.el = subTree.el
}

function processElement(vnode: any, container: any, parentComponent) {
	mountElement(vnode, container, parentComponent)
}

function mountElement(vnode: any, container: any, parentComponent) {
	// 此时 vnode 的type即为标签类型
	const { type, children, props, shapFlag } = vnode
	// const el = document.createElement(type)
	const el = (vnode.el = document.createElement(type))

	// props 是一个对象
	if (isObject(props)) {
		for (const key in props) {
			const val = props[key]
			// 添加事件注册，事件表示 onEventName
			const isOn = (key: string) => /^on[A-Z]/.test(key)
			if (isOn(key)) {
				const event = key.slice(2).toLowerCase()
				el.addEventListener(event, val)
			} else {
				el.setAttribute(key, val)
			}
		}
	}

	// if (typeof children === 'string') {
	if (shapFlag & ShapFlags.TEXT_CHILDREN) {
		el.textContent = children
		// } else if (Array.isArray(children)) {
	} else if (shapFlag & ShapFlags.ARRAY_CHILDREN) {
		// 每个 元素都有可能是 element 或者 vnode， 需要调用patch进行对应处理
		// children.forEach(child => patch(child, el))
		mountChildren(vnode, el, parentComponent)
	}

	// 挂载元素
	container.append(el)
}

function mountChildren(vnode: any, container, parentComponent) {
	vnode.children.forEach(child => patch(child, container, parentComponent))
}

function processFragment(vnode: any, container: any, parentComponent) {
	// 已知 slot是 一个数组，且仅需渲染 对应children，则可直接调用 mountChildren
	mountChildren(vnode, container, parentComponent)
}

function processText(vnode: any, container: any) {
	// vnode 就是纯粹的 text 内容，直接创建即可
	const textNode = (vnode.el = document.createTextNode(vnode.children))
	container.append(textNode)
}


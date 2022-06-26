import { render } from "./renderer"
import { createVnode } from "./vnode"

export function createApp(rootComponent) {

	return {
		mount(rootContainer) {
			// 先转换未 vnode
			// 再基于 vnode 进行后续操作

			const vnode = createVnode(rootComponent)

			render(vnode, rootContainer)
		}
	}
}
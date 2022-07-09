import { createRenderer } from '../../lib/mini-vue.esm.js'
import App from './App.js'

const game = new PIXI.Application({
	width: 500,
	height: 500,
})

document.body.append(game.view)

const renderer = createRenderer({
	createElement(type) {
		if (type === 'rect') {
			const rect = new PIXI.Graphics()
			rect.beginFill(0xff0000)
			rect.drawRect(0, 0, 50, 50)
			rect.endFill()

			return rect
		}
	},
	patchProps(el, key, val) {
		el[key] = val
	},
	insert(el, parent) {
		parent.addChild(el)
	},
})

// 由于实现的是canvas平台渲染器，所以根实例为 画布的stage
renderer.createApp(App).mount(game.stage)

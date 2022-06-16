// const block = document.querySelectorAll('div')
// block.forEach((item) => {
// 	item.addEventListener('mouseover', () => {
// 		clearClasses()
// 		item.classList.add('hover')
// 	})
// 	item.addEventListener('mouseleave', () => {
// 		item.classList.remove('hover')
// 	})
// })
// function clearClasses() {
// 	block.forEach((block) => block.classList.remove('hover'))
// }

import { $G } from '../util.js'

const left = $G('.main')
const right = $G('.img')

left.addEventListener('mouseover', () => {
	left.classList.add('hover')
	right.classList.add('hover2')
})
left.addEventListener('mouseleave', () => {
	left.classList.remove('hover')
	right.classList.remove('hover2')
})
right.addEventListener('mouseover', () => {
	right.classList.add('hover')
	left.classList.add('hover2')
})
right.addEventListener('mouseleave', () => {
	right.classList.remove('hover')
	left.classList.remove('hover2')
})

// document.querySelector('.main').addEventListener('mouseover', () => {
// 	document.querySelector('.main').classList.add('hover')
// 	document.querySelector('.img').classList.add('hover2')
// })

// document.querySelector('.img').addEventListener('mouseover', () => {
// 	document.querySelector('.img').classList.add('hover')
// 	document.querySelector('.main').classList.add('hover2')
// })

const blockAll = document.querySelectorAll('.block')
const block = document.querySelector('.block')
const main = document.querySelector('.main')
const div = '<div class="block">content</div>'
const div2 = document.createElement('div')
div2.classList.add('block')
div2.innerHTML = 'content'

// const add = new DOMParser().parseFromString(div, 'text/xml')

const getNewNode = () => {
	const div2 = document.createElement('div')
	div2.classList.add('block')
	div2.innerHTML = 'content' + count

	return div2
}

let count = 0
let prev = 0
let curr = 0
main.onscroll = (e) => {
	console.log('===')
	curr = main.scrollTop
	if (prev > curr) {
		console.log('上滑')
	} else {
		console.log('下移')
	}
	prev = curr
	// if (main.scrollHeight - window.innerHeight  > window.innerHeight && count < 10) {
	// 	count++
	// 	main.appendChild(getNewNode())
	// }
}

const email = document.querySelector('.email')
const input = document.querySelectorAll('input')
const button = document.querySelector('.button')
const text = document.querySelector('.text')
input.forEach((res) => {
	let item = res
	res.addEventListener('focus', () => {
		item.classList.add('active')
		item.previousSibling.childNodes.forEach((val) => {
			val.classList.remove('blurAni')
			val.classList.add('ani')
		})
	})
	res.addEventListener('blur', () => {
		item.classList.remove('active')
		item.previousSibling.childNodes.forEach((val) => {
			val.classList.remove('ani')
			val.classList.add('blurAni')
		})
	})
})
button.addEventListener('mousedown', () => {
	button.classList.add('buttonActive')
})
button.addEventListener('mouseup', () => {
	button.classList.remove('buttonActive')
})
button.addEventListener('mouseenter', () => {
	button.classList.add('activeText')
})
//点击login
button.addEventListener('click', () => {
	input.forEach((item) => {
		if (item.required && !item.innerHTML) {
			
		}
	})
})
text.addEventListener('mouseenter', () => {
	text.classList.add('activeText')
})

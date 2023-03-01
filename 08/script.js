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
		if (!res.value) {
			item.classList.remove('active')
			item.previousSibling.childNodes.forEach((val) => {
				val.classList.remove('ani')
				val.classList.add('blurAni')
			})
		}
		let req = document.getElementById('requiredTips')
		if (req) req.parentNode.removeChild(req)
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
	let item = document.createElement('div')
	item.innerText = '请填写此项'
	item.classList.add('requiredTips')
	item.id = 'requiredTips'
	for (let val = 0; val < input.length; val++) {
		if (input[val].required && !input[val].value) {
			input[val].parentNode.appendChild(item)
			input[val].focus()
			return
		}
	}
})
text.addEventListener('mouseenter', () => {
	text.classList.add('activeText')
})

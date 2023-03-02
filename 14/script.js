const closeClick = document.querySelector('.close')
const equalClick = document.querySelector('.equal')
const box = document.querySelector('.box')
const span = document.querySelectorAll('span')
closeClick.addEventListener('click', () => {
	box.classList.add('box-active')
	box.classList.remove('box-resume')
	span.forEach((item) => {
		item.classList.add('disappear')
	})
	equalClick.classList.remove('flex-none')
	closeClick.classList.add('flex-none')
})
equalClick.addEventListener('click', () => {
	box.classList.add('box-resume')
	box.classList.remove('box-active')
	span.forEach((item) => {
		item.classList.remove('disappear')
	})
	equalClick.classList.add('flex-none')
	closeClick.classList.remove('flex-none')
})

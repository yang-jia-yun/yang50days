const box = document.querySelectorAll('.flex-box')
const icon = document.querySelectorAll('.develop')
const closeAll = document.querySelectorAll('.close')
icon.forEach((item, index) => {
	item.addEventListener('click', () => {
		let value = box[index].querySelectorAll('.flex-none')
		box[index].querySelector('.develop').classList.add('flex-none')
		box[index].classList.add('backImage')
		value.forEach((val) => {
			val.classList.remove('flex-none')
		})
	})
})
closeAll.forEach((item, index) => {
	item.addEventListener('click', () => {
		box[index].querySelector('.develop').classList.remove('flex-none')
		box[index].classList.remove('backImage')
		box[index].querySelector('.close').classList.add('flex-none')
		box[index].querySelector('.answer').classList.add('flex-none')
	})
})

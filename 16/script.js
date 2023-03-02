const already = document.querySelector('.already')
const div = document.querySelectorAll('.cup')
div.forEach((item, index) => {
	item.addEventListener('click', () => {
		let length = document.querySelectorAll('.drink').length
		if (length > index + 1) {
			for (let i = index + 1; i < length; i++) {
				div[i].classList.remove('drink')
			}
		} else {
			for (let i = 0; i < index + 1; i++) {
				if (div[i].classList.length == 1) {
					div[i].classList.add('drink')
				}
			}
		}
		selectLength()
	})
})
function selectLength() {
	let length = document.querySelectorAll('.drink').length
	already.style.height = `${(350 / 8) * length}px`
	already.innerHTML = `${(length / 8) * 100}%`
	document.querySelector('.drinkCount').innerHTML = `${(2000 - 250 * length) / 1000}L`
	if (length == 8) {
		document.querySelector('.count').style.height = 0
	} else if (length == 0) {
		already.innerHTML = ''
	}
}

document.querySelector('.circular').addEventListener('click', () => {
	show = !show
	if (show) {
		document.querySelector('.card').classList.add('rotate')
	} else {
		document.querySelector('.card').classList.remove('rotate')
	}
})
let show = false

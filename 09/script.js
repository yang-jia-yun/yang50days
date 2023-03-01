const span = document.querySelectorAll('span')
const audio = document.querySelectorAll('audio')
span.forEach((item) => {
	item.addEventListener('click', () => {
		audio.forEach((val) => {
			if (val.id == item.innerText) val.play()
			else val.pause()
		})
	})
})

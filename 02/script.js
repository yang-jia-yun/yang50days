const circular = document.getElementsByClassName('.circular')
let currentId = 1
const add = () => {
	document.getElementById(`circular-${currentId}`).classList.add('active')
	document.getElementsByClassName('line-active')[0].style.width = (100 / 3) * (currentId - 1) + '%'
}
const remove = () => {
	document.getElementById(`circular-${currentId + 1}`).classList.remove('active')
	document.getElementsByClassName('line-active')[0].style.width = (100 / 3) * (currentId - 1) + '%'
}

document.getElementById('next').addEventListener('click', () => {
	currentId++

	add()
	if (currentId < 4) {
		//
		console.log(currentId)
		document.querySelector('#prev').removeAttribute('disabled')
	} else {
		// document.querySelector("#next").removeAttribute('disabled')
		console.log('aaaaa')
		document.querySelector('#next').setAttribute('disabled', true)
	}
})

document.getElementById('prev').addEventListener('click', () => {
	currentId--
	remove()
	if (currentId < 5 && currentId > 1) {
		document.querySelector('#next').removeAttribute('disabled')
	} else {
		document.querySelector('#prev').setAttribute('disabled', true)
	}
})

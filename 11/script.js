document.onkeydown = function (event) {
	let button = document.querySelector('#button')
	button.style.display = 'none'
	document.querySelector('.flex-box').style.display = 'flex'
	let key = document.querySelector('#key')
	key.innerHTML = event.key
	let keyCode = document.querySelector('#keyCode')
	keyCode.innerHTML = event.keyCode
	let code = document.querySelector('#code')
	code.innerHTML = event.code
}

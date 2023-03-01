const content = document.querySelector('.content')
const button = document.querySelector('.button')
const list = [
	'What did the sea say to the sand? "We have to stop meeting like this."',
	'What did the ocean say to the beach? Thanks for all the sediment.',
	'I wanted to be a tailor but I did not suit the job',
	'What do you call a bee that lives in America? A USB.',
]
content.innerHTML = 'sjchdcbdfhcbfhbvch'
let index = 0
button.addEventListener('click', () => {
	content.innerHTML = list[index]
	index++
})
button.addEventListener('mousedown', () => {
	button.classList.add('buttonActive')
})
button.addEventListener('mouseup', () => {
	button.classList.remove('buttonActive')
})

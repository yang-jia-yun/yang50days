const text = document.querySelector('textarea')
const value = document.querySelector('.value')
text.focus()
let index = 0
text.addEventListener('keyup', (event) => {
	let last = text.value.split(',')

	const div = value.querySelectorAll('div')

	div[index].innerText = last[index]

	if (div[index].innerText) div[index].style.display = 'inline-block'

	if (event.key === ',' && event.key !== 'Enter') {
		creat()
		index++
	}
	if (event.key === 'Enter') {
		//点击回车
		const times = 30 //循环亮30次
		text.value = ''
		const interval = setInterval(() => {
			let number = Math.floor(Math.random() * div.length)
			div[number].classList.add('highlight')
			setTimeout(() => {
				div[number].classList.remove('highlight')
			}, 100)
		}, 100)

		//30次后，清除定时器
		setTimeout(() => {
			clearInterval(interval)
			//随机亮起最后一个
			setTimeout(() => {
				let number = Math.floor(Math.random() * div.length)
				div[number].classList.add('highlight')
			}, 100)
		}, times * 100)
	}
})
creat()
function creat() {
	let div = document.createElement('div')
	div.classList.add('content')
	div.style.display = 'none'
	value.appendChild(div)
}

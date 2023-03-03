const main = document.querySelector('.main')
const image = document.querySelector('.small-img')
const left = document.querySelector('.left')
const right = document.querySelector('.right')
const list = [
	'https://img1.baidu.com/it/u=413643897,2296924942&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
	'https://img2.baidu.com/it/u=617579813,2960860841&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
	'https://img1.baidu.com/it/u=3573056321,2239143646&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
]
main.style.backgroundImage = `url(${list[0]})`
image.style.backgroundImage = `url(${list[0]})`
let index = 0
left.addEventListener('click', () => {
	if (index <= 0) index = list.length - 1
	else index--
	main.style.backgroundImage = `url(${list[index]})`
	image.style.backgroundImage = `url(${list[index]})`
})
right.addEventListener('click', () => {
	if (index >= list.length - 1) index = 0
	else index++
	main.style.backgroundImage = `url(${list[index]})`
	image.style.backgroundImage = `url(${list[index]})`
})

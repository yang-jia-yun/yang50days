const hand = document.querySelector('.hand')
const handMinute = document.querySelector('.hand-minute')
const handSecond = document.querySelector('.hand-second')
const timeNow = document.querySelector('.time')
const date = document.querySelector('.date')
const mode = document.querySelector('.mode')
let time = new Date()
let hour = null
let minu = null
let second = null
let day = time.getDay()
let mon = time.getMonth()
let year = time.getYear()
day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][day - 1]
mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'][mon - 1]
date.innerHTML = day + '，' + mon
getHoursTime()

setInterval(() => {
	getHoursTime()
}, 1000)

function getHoursTime() {
	time = new Date()
	hour = time.getHours()
	minu = time.getMinutes()
	second = time.getSeconds()
	timeNow.innerHTML = `${hour > 12 ? hour - 12 : hour} : ${minu > 9 ? minu : '0' + minu}  ${hour > 12 ? 'PM' : 'AM'}`
	if (hour > 12) hour = hour - 12
	hand.style.transform = `rotate(${(360 / 12) * hour}deg)`
	handMinute.style.transform = `rotate(${(360 / 60) * minu}deg)`
	handSecond.style.transform = `rotate(${(360 / 60) * second}deg)`
}

mode.addEventListener('click', () => {
	if (mode.innerHTML == 'Mark mode') {
		mode.innerHTML = 'Light mode'
		mode.style.backgroundColor = '#ffffff'
		mode.style.color = '#000000'
		document.querySelector('.main').style.backgroundColor = '#000000'
		document.querySelector('.circular').style.borderColor = '#ffffff'
		hand.style.backgroundColor = '#ffffff'
		handMinute.style.backgroundColor = '#ffffff'
		date.style.color = '#ffffff'
		timeNow.style.color = '#ffffff'
	} else {
		mode.innerHTML = 'Mark mode'
		mode.style.backgroundColor = '#000000'
		mode.style.color = '#ffffff'
		document.querySelector('.main').style.backgroundColor = '#ffffff'
		document.querySelector('.circular').style.borderColor = ''
		hand.style.backgroundColor = ''
		handMinute.style.backgroundColor = ''
		date.style.color = ''
		timeNow.style.color = ''
	}
})

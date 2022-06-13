let count = 1

setInterval(() => {
	if (count < 100) {
		count++
		document.querySelector('p').innerHTML = count + '%'
		document.querySelector('.main').style.filter = `blur(${100 - count}px)`
		if (count > 80) {
			document.querySelector('p').style.opacity = (100 - count) / 100
		} else {
			document.querySelector('p').style.opacity = count / 100
		}
	} else {
		clearInterval()
		document.querySelector('p').style.opacity = 0
	}
}, 25)

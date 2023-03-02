let i = 0
let ii = 0
let iii = 0
setInterval(() => {
	if (i < 12000) i += Math.ceil(12000 / 200)
	else i = 12000
	document.querySelector('.Twitter').innerText = i
}, 1)
setInterval(() => {
	if (ii < 5000) ii += Math.ceil(5000 / 200)
	else ii = 5000
	document.querySelector('.YouTube').innerText = ii
}, 1)
setInterval(() => {
	if (iii < 7500) iii += Math.ceil(7500 / 200)
	else iii = 7500
	document.querySelector('.Facebook').innerText = iii
}, 1)

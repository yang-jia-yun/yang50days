const input = document.querySelectorAll('input')
input.forEach((res) => {
	res.addEventListener('focus', () => {
		email.classList.add('ani')
	})
})
const email = document.querySelector('.email')

// console.log(document.getElementsByClassName('panel'));

const panels = document.querySelectorAll('.panel')

panels.forEach((panel) =>
	panel.addEventListener('click', function () {
		// document.querySelector('.panel.active').classList.remove('active')
		clearActiveClasses()

		panel.classList.add('active')
	})
)

function clearActiveClasses() {
	panels.forEach((panel) => panel.classList.remove('active'))
}

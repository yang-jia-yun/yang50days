import { $G } from '../util.js'

$G('.card').addEventListener('click', () => {
	show = !show
	if (show) {
		$G('input').focus()
		// $G('input').classList.add('show')
	} else {
		// $G('input').classList.remove('show')
	}
	$G('input').classList.toggle('show')
})
let show = false

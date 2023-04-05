/**
 * [setHeight description]
 *
 * @return  {[type]}  [return description]
 */
function set_height() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}

set_height();


window.addEventListener('resize', set_height);
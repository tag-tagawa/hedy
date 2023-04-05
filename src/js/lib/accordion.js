/* accordion js */

// import gsap
import {
	gsap
} from 'gsap';
import {
	ScrollToPlugin
} from 'gsap/ScrollToPlugin';
import {
	ScrollTrigger
} from 'gsap/ScrollTrigger';

let animation_tab = [];

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

// accordion title
const accordion_title = document.querySelectorAll('.js-accordion-toggle');

// accordion duration 
const accordion_duration = 0.004;
//const accordion_duration = 1;
if (accordion_title.length) {

	for (let i = 0; i < accordion_title.length; i++) {

		accordion_title[i].addEventListener('click', function (e) {

			const current_title = e.currentTarget;

			if (current_title.classList.contains('is-open')) {

				accordion_close(current_title, i);

			} else {

				accordion_open(current_title, i);

			}

			e.preventDefault();
		})
	}
}

/**
 * [accordion_open description]
 *
 * @param   {[type]}  active_accordion_title  [active_accordion_title description]
 *
 * @return  {[type]}                          [return description]
 */
function accordion_open(active_accordion_title, i) {

	const active_accordion_contents = active_accordion_title.parentNode.nextElementSibling;
	let start_accordion_contents_height, active_accordion_contents_height;

	active_accordion_title.classList.add('is-open');
	active_accordion_contents.classList.add('is-open');

	if (animation_tab[i]) {

		animation_tab[i].kill();

		start_accordion_contents_height = active_accordion_contents.clientHeight;
		active_accordion_contents_height = active_accordion_contents.scrollHeight;

	} else {

		start_accordion_contents_height = 0;
		active_accordion_contents_height = active_accordion_contents.scrollHeight;


	}
	// (active_accordion_contents_height * accordion_duration)

	animation_tab[i] = gsap.fromTo(active_accordion_contents, {
		height: start_accordion_contents_height,
		//opacity: 0,
	}, {
		//	duration: accordion_duration, // アニメーションは1秒間
		duration: (active_accordion_contents_height * accordion_duration),
		height: active_accordion_contents_height,
		//opacity: 1,
		//	ease: "circ",
		onComplete: function () {
			active_accordion_contents.style.removeProperty('height');
			animation_tab[i] = null;
		},
	});

	//console.log(animation_tab);
}

/**
 * [accordion_close description]
 *
 * @param   {[type]}  active_accordion  [active_accordion description]
 *
 * @return  {[type]}                    [return description]
 */
function accordion_close(active_accordion_title, i) {

	const active_accordion_contents = active_accordion_title.parentNode.nextElementSibling;

	let active_accordion_contents_height;

	if (animation_tab[i]) {

		animation_tab[i].kill();

		active_accordion_contents_height = active_accordion_contents.clientHeight;

	} else {

		active_accordion_contents_height = active_accordion_contents.scrollHeight;

	}

	active_accordion_title.classList.remove('is-open')
	active_accordion_contents.classList.remove('is-open');
	active_accordion_contents.style.display = 'block';

	animation_tab[i] = gsap.fromTo(active_accordion_contents, {
		height: active_accordion_contents_height,
		//	opacity: 1
	}, {
		duration: (active_accordion_contents_height * accordion_duration),
		height: 0,
		//	opacity: 0,
		//	ease: "circ",
		onComplete: function () {
			active_accordion_contents.style.removeProperty('display');
			active_accordion_contents.style.removeProperty('height');
			animation_tab[i] = null;
		},
	});

}
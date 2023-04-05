/* modal js */

const modal_wrap = document.querySelectorAll('.c-modal');
const dbody = document.body;

let modal_open = false;
const js_modal = document.getElementsByClassName('js-modal');

const modal_overlay = document.createElement('div');
modal_overlay.id = 'modal-overlay';
modal_overlay.classList.add('c-modal-overlay');

const modal_duration = 0.4;

// import bocdy scroll lock
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks
} from 'body-scroll-lock';

// import gsap
import {
	gsap
} from 'gsap';

// import scroll to plugin
import {
	ScrollToPlugin
} from 'gsap/ScrollToPlugin';

// import scroll trigger
import {
	ScrollTrigger
} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

if (js_modal) {

	for (let i = 0; i < js_modal.length; i++) {

		js_modal[i].addEventListener('click', function (e) {

			const target = e.currentTarget.hash;
			const target_modal = document.getElementById(target.replace('#', ''));
			const target_modal_content = target_modal.querySelector('.c-modal-content');

			dbody.appendChild(modal_overlay);
			dbody.classList.add('is-modal-open');

			disableBodyScroll(target_modal_content);

			gsap.fromTo(modal_overlay, {
				opacity: 0,
				//	height: 0,
				display: 'flex'
			}, {
				opacity: 1,
				//	height: target_menu.scrollHeight,
				duration: modal_duration,
				onComplete: function () {
					//	sp_drawer_menu.classList.add('is-open');
					modal_overlay.style.removeProperty('opacity');
					modal_overlay.style.removeProperty('display');
					//	target_menu.style.removeProperty('height');
					//	siteheader.style.removeProperty('position');
					//	siteheader.style.removeProperty('transform');
					//dbody.removeChild(drawer_overlay);
				}
			});

			gsap.fromTo(target_modal, {
				opacity: 0,
				//	height: 0,
				display: 'flex'
			}, {
				opacity: 1,
				//	height: target_menu.scrollHeight,
				delay: .2,
				duration: modal_duration,
				onComplete: function () {
					//	sp_drawer_menu.classList.add('is-open');
					target_modal.style.removeProperty('opacity');
					target_modal.style.removeProperty('display');
					target_modal.classList.add('is-open');
					//	target_menu.style.removeProperty('height');
					//	siteheader.style.removeProperty('position');
					//	siteheader.style.removeProperty('transform');
					//dbody.removeChild(drawer_overlay);
				}
			});

			modal_open = true;

			e.preventDefault();

		});

	}

}

const modal_close_target = document.querySelectorAll('.modal-close');

for (let j = 0; j < modal_close_target.length; j++) {

	modal_close_target[j].addEventListener('click', function (e) {

		const modal_target = e.currentTarget.closest('.c-modal');

		modal_close(modal_target);

		e.preventDefault();

	});

}

modal_overlay.addEventListener('click', function (e) {

	const openmodal = document.querySelectorAll('.c-modal.is-open');
	const target_modal = document.getElementById(openmodal[0].id);

	modal_close(target_modal);

	e.preventDefault();

});

for (let i = 0; i < modal_wrap.length; i++) {

	modal_wrap[i].addEventListener('click', function (e) {

		if (e.target.classList.contains('c-modal')) {

			const openmodal = document.querySelectorAll('.c-modal.is-open');
			const target_modal = document.getElementById(openmodal[0].id);

			modal_close(target_modal);
			e.preventDefault();
		}

	});

}

/**
 * [modal_close description]
 *
 * @param   {[type]}  modal_target  [modal_target description]
 *
 * @return  {[type]}                [return description]
 */
function modal_close(modal_target) {

	gsap.fromTo(modal_overlay, {
		opacity: 1,
		//	height: 0,
		//	display: 'block',

	}, {
		opacity: 0,
		//	height: target_menu.scrollHeight,
		duration: modal_duration,
		onComplete: function () {
			//	sp_drawer_menu.classList.add('is-open');
			modal_overlay.style.removeProperty('opacity');
			//	modal_overlay.style.removeProperty('display');
			//	target_menu.style.removeProperty('height');
			//	siteheader.style.removeProperty('position');
			//	siteheader.style.removeProperty('transform');
			//dbody.removeChild(drawer_overlay);

			dbody.removeChild(modal_overlay);
		}
	});

	gsap.fromTo(modal_target, {
		opacity: 1,
		//	height: 0,
		//	display: 'block',

	}, {
		opacity: 0,
		//	height: target_menu.scrollHeight,
		duration: modal_duration,
		onComplete: function () {
			//	sp_drawer_menu.classList.add('is-open');
			modal_target.classList.remove('is-open');
			modal_target.style.removeProperty('opacity');
			modal_target.style.removeProperty('display');
			//	target.classList.add('is-open');
			//	target_menu.style.removeProperty('height');
			//	siteheader.style.removeProperty('position');
			//	siteheader.style.removeProperty('transform');
			//dbody.removeChild(drawer_overlay);
		}
	});

	dbody.classList.remove('is-modal-open');

	modal_open = false;

	clearAllBodyScrollLocks();

}

// ios page back event
window.addEventListener('pageshow', function (event) {

	if (event.persisted) {
		unloadingWebsite();
	}

});

/**
 * [unloadingWebsite description]
 *
 * @return  {[type]}  [return description]
 */
function unloadingWebsite() {
	// Do something just before the user leaves:
	// Eg: Hide/close your menu/reset settings/clear cookies etc, whatever you need to do.

	document.body.classList.add('unloaded');

	const openmodal = document.querySelectorAll('.c-modal.is-open');

	for (let i = 0; i < openmodal.length; i++) {

		if (openmodal[i].classList.contains('is-open')) {

			const target_modal = document.getElementById(openmodal[i].id);

			modal_close(target_modal);

		}

	}

	window.setTimeout(function () {

		document.body.classList.remove('unloaded');

	}, 200);

}
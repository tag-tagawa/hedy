// import bocdy scroll lock
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks
} from 'body-scroll-lock';

// import gsap
import {
	gsap
} from "gsap";
import {
	ScrollToPlugin
} from "gsap/ScrollToPlugin";
import {
	ScrollTrigger
} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

// import matchmedia
import {
	device_mode,
	mediaQueryList
} from './matchmedia.js';

const l_header = document.querySelector('.l-header');
const l_main_navi = document.querySelector('.l-header-menu');
const l_menu_btn = document.querySelector('.l-menu-btn');
const l_main_navi_overlay = document.querySelector('.l-main-navi-overlay');

const accordion_duration = 0.4;
const js_navi_open = document.querySelectorAll('.js-navi-open');
let navi_open = false;

for (let i = 0; i < js_navi_open.length; i++) {

	js_navi_open[i].addEventListener('click', function (e) {

		const current_navi = e.currentTarget;

		if (navi_open == false) {

			drawer_open(current_navi);

		} else {

			drawer_close(current_navi);

		}

	});

}

const js_navi_menu = document.querySelectorAll('.js-navi-menu');

for (let i = 0; i < js_navi_menu.length; i++) {

	js_navi_menu[i].addEventListener('click', function (e) {

		const current_navi = e.currentTarget;

		if (navi_open && device_mode == 'sp') {

			drawer_close(current_navi);
		}

	});

}


// ios page back event
window.onpageshow = function (event) {
	if (event.persisted) {
		unloadingWebsite();
	}
};

/**
 * [unloadingWebsite description]
 *
 * @return  {[type]}  [return description]
 */
function unloadingWebsite() {
	// Do something just before the user leaves:
	// Eg: Hide/close your menu/reset settings/clear cookies etc, whatever you need to do.
	const dc = document.body;

	dc.classList.add('unloaded');

	if (l_header.classList.contains('is-open')) {

		l_header.classList.remove('is-open');
		l_main_navi.classList.remove('is-open');
		l_menu_btn.classList.remove('is-on');
		l_main_navi_overlay.classList.remove('is-on');

		enableBodyScroll(sp_main_navi);
		clearAllBodyScrollLocks();

	}

	window.setTimeout(function () {

		document.body.classList.remove('unloaded');

	}, 200);

}

/**
 * [drawer_open description]
 *
 * @param   {[type]}  current_navi  [current_navi description]
 *
 * @return  {[type]}                [return description]
 */
function drawer_open(current_navi) {

	l_menu_btn.classList.add('is-open');
	l_main_navi.classList.add('is-open');

	l_main_navi.style.opacity = 0;

	gsap.fromTo(l_main_navi, {
		//	height: 0,
		opacity: 0,
	}, {
		duration: accordion_duration,
		//height: active_accordion_contents_height,
		opacity: 1,
		//	ease: "circ",
		onComplete: function () {
			l_main_navi.style.removeProperty('opacity');
		}, // 処理後じ実行する関数を指定
	});

	navi_open = true;

	disableBodyScroll(current_navi);

}

/**
 * [drawer_close description]
 *
 * @param   {[type]}  current_navi  [current_navi description]
 *
 * @return  {[type]}                [return description]
 */
function drawer_close(current_navi) {

	l_menu_btn.classList.remove('is-open');
	l_main_navi.style.opacity = 1;

	gsap.fromTo(l_main_navi, {
		//	height: 0,
		opacity: 1,
	}, {
		duration: accordion_duration,
		//height: active_accordion_contents_height,
		opacity: 0,
		//	ease: "circ",
		onComplete: function () {
			l_main_navi.classList.remove('is-open');
			l_main_navi.style.removeProperty('opacity');
		}, // 処理後じ実行する関数を指定
	});

	navi_open = false;
	enableBodyScroll(current_navi);
	clearAllBodyScrollLocks();

}
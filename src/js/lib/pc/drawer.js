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
const dbody = document.body;
const drawer_overlay = document.createElement('div');
drawer_overlay.id = 'drawer-overlay';
drawer_overlay.classList.add('c-drawer-overlay');

// import matchmedia

import {
	device_mode,
	mediaQueryList
} from '../matchmedia.js';

const l_header = document.querySelector('.fs-l-header');
const l_main_navi = document.querySelector('.fs-l-header__gnav');
const l_menu_btn = document.querySelector('.l-menu-btn');
//const l_main_navi_overlay = document.querySelector('.l-drawer-overlay');

//const js_drawer_menu_lists = document.querySelector('.js-drawer-menu-lists');

//const drawer_menu_lists = js_drawer_menu_lists.querySelectorAll('.drawer-menu-lists');

//const accordion_duration = 0.4;
const drawer_width = 300;
const drawer_duration = 0.6;
const js_navi_open = document.querySelectorAll('.js-pc-drawer-open');

let animation_navi_open_menu = null;

let animation_subnavi_open_menu = null;
let animation_subnavi_list_open_menu = [];

console.log(js_navi_open);

let navi_open = false;

if (js_navi_open.length) {

	for (let i = 0; i < js_navi_open.length; i++) {

		js_navi_open[i].addEventListener('click', function (e) {

			const current_navi = e.currentTarget;

			console.log(current_navi);

			if (navi_open == false) {

				drawer_open(current_navi);

			} else {

				drawer_close(current_navi);

			}

		});

	}

}

const js_drawer_close_target = document.querySelectorAll('.js-pc-drawer-close');

if (js_drawer_close_target.length) {

	for (let j = 0; j < js_drawer_close_target.length; j++) {

		js_drawer_close_target[j].addEventListener('click', function (e) {

			drawer_all_close();

			e.preventDefault();

		});

	}
}

drawer_overlay.addEventListener('click', function (e) {

	drawer_all_close();

	e.preventDefault();

});

// ios page back event

window.addEventListener('pageshow', function (event) {
	//alert('show');
	//console.log(event.persisted);
	//console.log(device_mode);
	if (event.persisted && device_mode == 'pc') {
		unloadingWebsite();
	}
});

// drewer menu override
/*
const fs_side_area_lists = js_drawer_menu_lists.querySelectorAll('.fs-l-main .fs-l-sideArea ul li');

for (let i = 0; i < fs_side_area_lists.length; i++) {

	fs_side_area_lists[i].addEventListener('click', function (e) {
		e.stopImmediatePropagation();
		//	e.preventDefault();
		//	e.stopPropagation();
	});
}
*/

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

	//	console.log(l_main_navi.classList);

	if (l_main_navi.classList.contains('is-open')) {

		//	l_header.classList.remove('is-open');
		//	l_main_navi.classList.remove('is-open');
		//	l_menu_btn.classList.remove('is-open');
		//	l_main_navi_overlay.classList.remove('is-on');

		//	const slide_child_menu_open = document.querySelector('.slide-child-menu.is-open');

		//	console.log(slide_child_menu_open);

		//	if (slide_child_menu_open) {

		//		slide_child_menu_open.style.top = '';
		//		slide_child_menu_open.classList.remove('is-open');
		//	}

		//	const drawer_child_menu_open = document.querySelectorAll('.drawer-menu-lists.is-child-open');

		//	console.log(drawer_child_menu_open);
		//	for (let i = 0; i < drawer_child_menu_open.length; i++) {

		//		drawer_child_menu_open[i].classList.remove('is-child-open');

		//		}

		//		dbody.classList.remove('is-drawer-open');

		//		l_header.removeChild(drawer_overlay);

		drawer_all_close();
		navi_open = false;

		//enableBodyScroll(js_drawer_menu_lists);
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

	console.log('open');

	l_header.appendChild(drawer_overlay);
	dbody.classList.add('is-drawer-open');
	//current_navi.classList.add('is-open');
	//js_drawer_menu_lists.scrollTop = 0;

	let main_navi_left;

	l_menu_btn.classList.add('is-open');
	l_main_navi.classList.add('is-open');

	console.log(animation_navi_open_menu);

	if (animation_navi_open_menu) {

		animation_navi_open_menu.kill();

		main_navi_left = l_main_navi.style.left;

	} else {

		main_navi_left = -drawer_width;
	}

	// drawer animation
	animation_navi_open_menu = gsap.fromTo(l_main_navi, {
		//x: '-100%',
		left: main_navi_left,
		opacity: 0
	}, {
		//	x: '0',
		left: 0,
		opacity: 1,
		duration: drawer_duration,
		ease: 'Circ.easeOut',
		onComplete: function () {
			l_main_navi.style = '';
			//l_main_navi.style.removeProperty('transform');
			animation_navi_open_menu = null;
		}, // 処理後じ実行する関数を指定
	});

	// overlay animation
	gsap.fromTo(drawer_overlay, {
		opacity: 0,
	}, {
		opacity: 1,
		duration: .2,
		ease: 'Circ.easeOut',

		onComplete: function () {
			//	l_main_navi.style = '';
			//l_main_navi.style.removeProperty('transform');
		}, // 処理後じ実行する関数を指定
	});

	navi_open = true;

	disableBodyScroll(l_main_navi);

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

	let main_navi_left_start;

	//	console.log(animation_navi_open_menu);

	if (animation_navi_open_menu) {

		animation_navi_open_menu.kill();

		main_navi_left_start = l_main_navi.style.left;

	} else {

		main_navi_left_start = 0;
	}

	gsap.fromTo(l_main_navi, {
		left: main_navi_left_start,
		display: 'block',
		opacity: 1
	}, {
		duration: drawer_duration,
		left: -drawer_width,
		opacity: 0,
		ease: 'Circ.easeOut',
		onComplete: function () {
			l_main_navi.classList.remove('is-open');
			l_main_navi.style = '';
			animation_navi_open_menu = null;
		}, // 処理後じ実行する関数を指定
	});

	// overlay animation
	gsap.fromTo(drawer_overlay, {
		opacity: 1,
	}, {
		opacity: 0,
		duration: .2,
		ease: 'Circ.easeOut',
		onComplete: function () {
			l_header.removeChild(drawer_overlay);
		}, // 処理後じ実行する関数を指定
	});

	dbody.classList.remove('is-drawer-open');
	navi_open = false;
	enableBodyScroll(l_main_navi);
	clearAllBodyScrollLocks();

}

const js_pc_slidechild_menu_open = document.querySelectorAll('.js-pc-slide-child-menu-open');


if (js_pc_slidechild_menu_open.length) {

	for (let i = 0; i < js_pc_slidechild_menu_open.length; i++) {

		js_pc_slidechild_menu_open[i].addEventListener('click', function (e) {

			const current_target = e.currentTarget;
			const active_slide_contents = current_target.nextElementSibling;

			console.log(active_slide_contents);

			dbody.classList.add('is-drawer-submenu-open');

			if (!current_target.classList.contains('is-open')) {

				console.log('open');

				const is_open_navi = document.querySelector('.js-pc-slide-child-menu-open.is-open');

				if (is_open_navi) {

					const is_open_slide_contents = is_open_navi.nextElementSibling;

					submenu_close(is_open_slide_contents, is_open_navi);

				}

				submenu_open(active_slide_contents, current_target, is_open_navi);

			} else {

				console.log('close');
				submenu_close(active_slide_contents, current_target);
			}

			e.preventDefault();

		});

	}

}

function submenu_open(active_slide_contents, current_target, is_open_navi) {

	current_target.classList.add('is-open');
	active_slide_contents.classList.add('is-open');
	active_slide_contents.style.display = 'block';

	let is_search_page = false;
	let is_search_menu = false;
	let slide_x, slide_opacity, submenu_duration, slide_easing;

	//	console.log(active_slide_contents);
	//	console.log(current_target);

	if (is_open_navi) {
		const is_open_slide_contents = is_open_navi.nextElementSibling;

		//console.log(is_open_slide_contents);

		if (is_open_slide_contents.classList.contains('is-search-menu')) {

			is_search_menu = true;

		}
	}


	if (current_target.classList.contains('is-search')) {

		is_search_page = true;

	}



	//	console.log(active_slide_contents);
	//	console.log(is_open_navi + ':' + is_search_page + ':' + is_search_menu);

	if (is_open_navi && is_search_page && !is_search_menu) {

		slide_x = '-100%';
		slide_opacity = 1;
		submenu_duration = ((drawer_duration * 100) + 400);

		console.log('A');


	} else if (is_open_navi && !is_search_page && !is_search_menu) {

		slide_x = '0';
		slide_opacity = 1;
		submenu_duration = 0;

		console.log('B');

	} else if (is_open_navi && !is_search_page && is_search_menu) {

		slide_x = '0';
		slide_opacity = 1;
		submenu_duration = 0;

		console.log('C');

	} else {


		submenu_duration = ((drawer_duration * 100) + 400);

		console.log('D');

		if (animation_subnavi_open_menu) {

			const get_transrate = active_slide_contents.style.transform.split(/\w+\(|\);?/);

			if (!get_transrate[1] || !get_transrate[1].length) {

			} else {

				slide_x = get_transrate[1].split(/,\s?/g)[0];

			}

			console.log(slide_x);
			slide_opacity = active_slide_contents.style.opacity;

			slide_easing = 'Power0.easeNone';

		} else {

			slide_x = '-100%';
			slide_opacity = 0;
			slide_easing = 'Circ.easeOut';

		}


	}

	if (active_slide_contents.classList.contains('child_menu')) {

		const menu_lists = active_slide_contents.querySelectorAll('li');

		menu_lists.forEach((el, i) => {
			el.style.opacity = 0;
		});

		setTimeout(() => {

			console.log()
			// 演出対象となる要素を取得
			menu_lists.forEach((el, i) => {
				animation_subnavi_list_open_menu[i] = gsap.fromTo(el, {
					//	x: '-100%',
					opacity: 0,
					y: '12px'
				}, {
					//duration: drawer_duration,
					//	x: '0%',
					delay: 0.02 * i,
					opacity: 1,
					y: 0,
					ease: 'Circ.easeOut',
					//height: active_accordion_contents_height,
					//opacity: 0,
					//	ease: "circ",
					onComplete: function () {
						el.style = '';
					}, // 処理後じ実行する関数を指定
				});

				if (i === menu_lists.length - 1) {

					active_slide_contents.classList.add('is-menu-show');
					//console.log("Last callback call at index " + idx + " with value " + elem );

				}
			});

		}, submenu_duration)

	}


	animation_subnavi_open_menu = gsap.fromTo(active_slide_contents, {
		x: slide_x,
		//	opacity: (is_open_navi) ? 1 : 0,
		opacity: slide_opacity,
		zIndex: '-1',
	}, {
		duration: drawer_duration,
		//	x: '0%',
		x: '0%',
		opacity: 1,
		zIndex: '-1',
		ease: slide_easing,
		//height: active_accordion_contents_height,
		//opacity: 0,
		//	ease: "circ",
		onComplete: function () {

			active_slide_contents.style = '';
			animation_subnavi_open_menu = null;
		}, // 処理後じ実行する関数を指定
	});



}

/**
 * [submenu_close description]
 *
 * @param   {[type]}  active_slide_contents  [active_slide_contents description]
 * @param   {[type]}  current_target         [current_target description]
 *
 * @return  {[type]}                         [return description]
 */
function submenu_close(active_slide_contents, current_target) {

	current_target.classList.remove('is-open');
	active_slide_contents.classList.remove('is-open');
	active_slide_contents.style.display = 'block';
	let close_slide_x, close_opacity, close_easing;

	console.log(animation_subnavi_open_menu);
	console.log(active_slide_contents);


	if (animation_subnavi_open_menu) {

		const get_transrate = active_slide_contents.style.transform.split(/\w+\(|\);?/);

		if (!get_transrate[1] || !get_transrate[1].length) {

		} else {

			close_slide_x = get_transrate[1].split(/,\s?/g)[0];

		}

		console.log(close_slide_x);
		close_opacity = active_slide_contents.style.opacity;

		close_easing = 'Power0.easeNone';

	} else {

		close_slide_x = '0%';
		close_opacity = 1;
		close_easing = 'Circ.easeIn';

	}

	console.log(close_slide_x);
	console.log(close_opacity);

	animation_subnavi_open_menu = gsap.fromTo(active_slide_contents, {
		//	x: '0%',
		x: close_slide_x,
		opacity: close_opacity,
		zIndex: '-2',
	}, {
		duration: drawer_duration,
		x: '-100%',
		opacity: 0,
		zIndex: '-2',
		ease: close_easing,

		onComplete: function () {

			active_slide_contents.style = '';
			animation_subnavi_open_menu = null;
			active_slide_contents.classList.remove('is-menu-show');
			/*
			if (animation_subnavi_list_open_menu) {

				//console.log(animation_subnavi_list_open_menu);
				animation_subnavi_list_open_menu.forEach((el, i) => {

					console.log(el);
					console.log(animation_subnavi_list_open_menu[i])

					animation_subnavi_list_open_menu[i].kill();

				});

				menu_lists.forEach((el, i) => {
					el.style = '';
				});

			}	*/
		}, // 処理後じ実行する関数を指定
	});

}

function drawer_all_close() {

	const is_open_navi = document.querySelector('.js-pc-slide-child-menu-open.is-open');

	if (is_open_navi) {

		const is_open_slide_contents = is_open_navi.nextElementSibling;

		submenu_close(is_open_slide_contents, is_open_navi);

	}

	const drawer_target = document.querySelector('.js-pc-drawer-open.is-open');

	drawer_close(drawer_target);

}


// check color event

$(function () {
	$('.js-input-color-check').on('click', function () {
		if ($(this).prop('checked')) {
			// 一旦全てをクリアして再チェックする
			$('.js-input-color-check').prop('checked', false);
			$(this).prop('checked', true);
		}
	});
});
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
/*
import {
	device_mode,
	mediaQueryList
} from './matchmedia.js';
*/
const l_header = document.querySelector('.fs-l-header');
const l_main_navi = document.querySelector('.fs-p-drawer');
const l_menu_btn = document.querySelector('.l-menu-btn');
const l_main_navi_overlay = document.querySelector('.l-drawer-overlay');

const js_drawer_menu_lists = document.querySelector('.js-drawer-menu-lists');

const drawer_menu_lists = js_drawer_menu_lists.querySelectorAll('.drawer-menu-lists');

const accordion_duration = 0.4;
const drawer_duration = .6;
const js_navi_open = document.querySelectorAll('.js-drawer-open');
let navi_open = false;

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


// ios page back event

window.onpageshow = function (event) {
	if (event.persisted) {
		unloadingWebsite();
	}
};

// drewer menu override
const fs_side_area_lists = js_drawer_menu_lists.querySelectorAll('.fs-l-main .fs-l-sideArea ul li');

for (let i = 0; i < fs_side_area_lists.length; i++) {

	fs_side_area_lists[i].addEventListener('click', function (e) {
		e.stopImmediatePropagation();
		//	e.preventDefault();
		//	e.stopPropagation();
	});
}


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

	if (l_main_navi.classList.contains('is-open')) {



		//	l_header.classList.remove('is-open');
		l_main_navi.classList.remove('is-open');
		l_menu_btn.classList.remove('is-open');
		//	l_main_navi_overlay.classList.remove('is-on');

		const slide_child_menu_open = document.querySelector('.slide-child-menu.is-open');

		console.log(slide_child_menu_open);

		if (slide_child_menu_open) {

			slide_child_menu_open.style.top = '';
			slide_child_menu_open.classList.remove('is-open');
		}

		const drawer_child_menu_open = document.querySelectorAll('.drawer-menu-lists.is-child-open');

		console.log(drawer_child_menu_open);
		for (let i = 0; i < drawer_child_menu_open.length; i++) {
			drawer_child_menu_open[i].classList.remove('is-child-open');

		}

		dbody.classList.remove('is-drawer-open');

		dbody.removeChild(drawer_overlay);

		navi_open = false;

		enableBodyScroll(js_drawer_menu_lists);
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

	dbody.appendChild(drawer_overlay);
	dbody.classList.add('is-drawer-open');
	//current_navi.classList.add('is-open');

	js_drawer_menu_lists.scrollTop = 0;

	l_menu_btn.classList.add('is-open');
	l_main_navi.classList.add('is-open');

	// drawer animation
	gsap.fromTo(l_main_navi, {
		x: '-101%'
	}, {
		x: '0%',
		duration: drawer_duration,
		ease: 'Circ.easeOut',
		onComplete: function () {
			l_main_navi.style = '';
			//l_main_navi.style.removeProperty('transform');
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

	disableBodyScroll(js_drawer_menu_lists);

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
	l_main_navi.classList.remove('is-open');

	gsap.fromTo(l_main_navi, {
		x: '0%',
	}, {
		duration: drawer_duration,
		x: '-101%',
		ease: 'Circ.easeOut',
		onComplete: function () {
			l_main_navi.style = '';

			const slide_child_menu_open = document.querySelector('.slide-child-menu.is-open');

			console.log(slide_child_menu_open);

			if (slide_child_menu_open) {

				slide_child_menu_open.style.top = '';
				slide_child_menu_open.classList.remove('is-open');
			}

			const drawer_child_menu_open = document.querySelectorAll('.drawer-menu-lists.is-child-open');

			console.log(drawer_child_menu_open);
			for (let i = 0; i < drawer_child_menu_open.length; i++) {
				drawer_child_menu_open[i].classList.remove('is-child-open');

			}
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
			dbody.removeChild(drawer_overlay);



		}, // 処理後じ実行する関数を指定
	});

	dbody.classList.remove('is-drawer-open');
	navi_open = false;
	enableBodyScroll(js_drawer_menu_lists);
	clearAllBodyScrollLocks();

}

const js_slidechild_menu_open = document.querySelectorAll('.js-slide-child-menu-open');

for (let i = 0; i < js_slidechild_menu_open.length; i++) {

	js_slidechild_menu_open[i].addEventListener('click', function (e) {

		const current_target = e.currentTarget;

		console.log('click');

		const active_slide_contents = current_target.nextElementSibling;

		console.log(active_slide_contents);

		const active_slide_menu_wrap = active_slide_contents.querySelector('.slide-child-menu-wrap');
		//console.log(active_slide_contents.querySelector('.slide-child-menu-wrap'));

		const drawer_head = document.querySelector('.drawer-head');
		const drawer_head_height = drawer_head.offsetHeight;
		dbody.classList.add('is-drawer-submenu-open');

		console.log(drawer_head_height);

		active_slide_contents.style.display = 'block';
		active_slide_contents.style.left = 0;
		// 指定要素のスクロール量を設定

		active_slide_contents.scrollTop = 0;
		active_slide_menu_wrap.scrollTop = 0;

		let fs_head = document.querySelector('.fs-l-header');

		var fs_head_style = fs_head.currentStyle || window.getComputedStyle(fs_head);

		//console.log();

		//	console.log(l_main_navi.scrollTop);
		active_slide_contents.style.top = (drawer_head_height + l_main_navi.scrollTop + parseInt(fs_head_style.paddingBottom)) + 'px';

		// drawer animation


		//const js_drawer_menu_lists = document.querySelectorAll('.js-drawer-menu-lists .drawer-menu-lists');

		for (let i = 0; i < drawer_menu_lists.length; i++) {

			gsap.fromTo(drawer_menu_lists[i], {
				left: '0',
				//position: 'relative'
			}, {
				left: '-100%',
				duration: drawer_duration,
				ease: 'Circ.easeOut',
				onComplete: function () {
					drawer_menu_lists[i].classList.add('is-child-open');
					drawer_menu_lists[i].style.removeProperty('left');
					//l_main_navi.style.removeProperty('transform');
				}, // 処理後じ実行する関数を指定
			});
		}


		gsap.fromTo(active_slide_contents, {
			x: '100%',
			//opacity: 1,
		}, {
			duration: drawer_duration,
			x: '0%',
			ease: 'Circ.easeOut',
			//height: active_accordion_contents_height,
			//opacity: 0,
			//	ease: "circ",
			onComplete: function () {

				active_slide_contents.style.removeProperty('translate');
				active_slide_contents.style.removeProperty('rotate');
				active_slide_contents.style.removeProperty('scale');
				active_slide_contents.style.removeProperty('transform');
				active_slide_contents.style.removeProperty('dispaly');
				active_slide_contents.style.removeProperty('left');
				active_slide_contents.style.removeProperty('display');
				//	active_slide_contents.style.removeProperty('top');*/
				active_slide_contents.classList.add('is-open');
				//	active_slide_contents.style = '';
				//	l_main_navi.classList.remove('is-open');
				//	l_main_navi.style.removeProperty('opacity');
			}, // 処理後じ実行する関数を指定
		});
		clearAllBodyScrollLocks();
		disableBodyScroll(active_slide_menu_wrap);

		e.preventDefault();

	});

}

const js_slidechild_menu_close = document.querySelectorAll('.js-slide-child-menu-close');


for (let i = 0; i < js_slidechild_menu_close.length; i++) {

	js_slidechild_menu_close[i].addEventListener('click', function (e) {

		const current_target = e.currentTarget;

		console.log('click');

		const active_slide_contents = current_target.closest('.slide-child-menu');

		const active_slide_menu_wrap = active_slide_contents.querySelector('.slide-child-menu-wrap');
		//console.log(active_slide_contents);


		for (let i = 0; i < drawer_menu_lists.length; i++) {

			gsap.fromTo(drawer_menu_lists[i], {
				left: '-100%',
				//position: 'relative'
			}, {
				left: '0',
				duration: drawer_duration,
				ease: 'Circ.easeOut',
				onComplete: function () {
					drawer_menu_lists[i].classList.remove('is-child-open');
					drawer_menu_lists[i].style.removeProperty('left');
					//l_main_navi.style.removeProperty('transform');
				}, // 処理後じ実行する関数を指定
			});
		}

		gsap.fromTo(active_slide_contents, {
			x: '0%',
			//opacity: 1,
		}, {
			duration: drawer_duration,
			x: '100%',
			//height: active_accordion_contents_height,
			//opacity: 0,
			ease: 'Circ.easeOut',
			onComplete: function () {
				//	l_main_navi.classList.remove('is-open');
				//	l_main_navi.style.removeProperty('opacity');

				//		active_slide_contents.style.removeProperty('translate');
				//		active_slide_contents.style.removeProperty('rotate');
				//		active_slide_contents.style.removeProperty('scale');
				active_slide_contents.style.removeProperty('transform');

				active_slide_contents.style.removeProperty('display');
				active_slide_contents.style.removeProperty('top');

				active_slide_contents.classList.remove('is-open');

				//		dbody.classList.remove('is-drawer-submenu-open');
			}, // 処理後じ実行する関数を指定
		});




		enableBodyScroll(active_slide_menu_wrap);
		clearAllBodyScrollLocks();
		disableBodyScroll(js_drawer_menu_lists);
		e.preventDefault();


	});

}


function get_header_height() {

	let fs_head = document.querySelector('.fs-l-header');

	let input_wrap = fs_head.querySelector('.bl_header_inputWrap');

	var fs_head_style = fs_head.currentStyle || window.getComputedStyle(fs_head);

	//console.log();

	console.log(input_wrap.offsetHeight);
	let hh = fs_head.offsetHeight - input_wrap.offsetHeight - parseInt(fs_head_style.paddingBottom);


	//console.log(hh.offsetHeight);

	document.documentElement.style.setProperty('--hh', `${hh}px`);
}

window.addEventListener('load', get_header_height);

window.addEventListener('resize', get_header_height);
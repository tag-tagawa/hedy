// import gsap
import {
	gsap
} from "gsap";

// import scroll to plugin
import {
	ScrollToPlugin
} from "gsap/ScrollToPlugin";

// import scroll trigger
import {
	ScrollTrigger
} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

/*
ScrollTrigger.create({
	start: 'top -50',
	end: 99999,
	toggleClass: {
		className: 'is-on',
		targets: '#footer-page-top a'
	}
});
*/

const data_scroll = document.querySelectorAll('[data-scroll]');

if (data_scroll.length) {

	for (let i = 0; i < data_scroll.length; i++) {

		data_scroll[i].addEventListener('click', function (e) {

			const link_hash = get_page_anchor(data_scroll[i]);

			scrollto_hash(link_hash, e);

		});

	}

}

/**
 * [get_page_anchor description]
 *
 * @param   {[type]}  link  [link description]
 *
 * @return  {[type]}        [return description]
 */
function get_page_anchor(link) {

	if (
		link.protocol !== window.location.protocol ||
		link.host !== window.location.host ||
		link.pathname !== window.location.pathname ||
		link.search !== window.location.search
	) {
		return false;
	}

	return link.hash;

}

/**
 * [scrollto_hash description]
 *
 * @param   {[type]}  hash  [hash description]
 * @param   {[type]}  e     [e description]
 *
 * @return  {[type]}        [return description]
 */
function scrollto_hash(hash, e) {

	const elem = hash ? document.querySelector(hash) : false;
	const header = document.getElementById('header');
	const header_height = header.scrollHeight;

	if (elem) {

		if (e) {
			e.preventDefault();
			gsap.to(window, {
				duration: 0.6,
				ease: 'expo.out',
				scrollTo: {
					y: elem,
					offsetY: header_height
				}
			});
		}
	}
}
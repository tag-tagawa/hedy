/*!
 * main js
 */

// load es6 promise
import 'es6-promise/auto';

// import matchmedia
import {
	device_mode,
	mediaQueryList
} from './lib/matchmedia.js';

// import slick js
//import './lib/slick.js';

// import accordion
//import './lib/accordion.js';

// import tabs
//import './lib/tabs.js';

// import drawer
//import './lib/drawer.js';

// import ancor
//import './lib/ancor.js';

// import modal
//import './lib/modal.js';

// import window-height
//import './lib/window-height.js';

// import index slider js
//import './lib/index-slider.js';

//20230405 �ǉ�
$(function(){
	$('.gnav__hamburgerMenu').click(function(){
		$('.gnav__hamburgerMenu,.fs-l-header__gnavContainer,.bg_bk_cover,body,.fs-p-headerNavigation,.l_header__welcomeMsg_new').toggleClass('active');
		$('.gnav_submenu').removeClass('is-open');
		$('.gnav_submenu').css({'animation-name':'','animation-duration':'','animation-fill-mode':''});
	});
	$('.bg_bk_cover').click(function(){
		$('.gnav__hamburgerMenu,.fs-l-header__gnavContainer,.bg_bk_cover,body,.fs-p-headerNavigation,.l_header__welcomeMsg_new').removeClass('active');
		$('.gnav_submenu').css({'animation-name':'','animation-duration':'','animation-fill-mode':''});
	});
// �T�u���j���[����
$(".js-submenu-open").click(function () {

	// �T�u���j���[ open���ɃC�����C���X�^�C�����Z�b�g
	$('.child_menu.gnav_submenu').find('li').each(function (key, value) {

		var this_list = $(this);
		this_list.removeClass('is-active').attr('style', '');

	});

	$('.has-child ul.gnav_submenu').find('li').removeClass('is-active')

	// $('.fs-p-headerNavigation__list').find('is-open').css({ 'transition':''});


	$(this).next('.gnav_submenu').hasClass('is-open') ?
		$('.gnav_submenu').removeClass("is-open") :
		($('.has-child ul.gnav_submenu').removeClass('is-open'),
			$(this).next('.gnav_submenu').toggleClass('is-open'))

	if ($(this).next('.gnav_submenu').hasClass('is-open')) {

		$('.gnav_submenu').css({ 'animation-name': 'fadeLeftAnime', 'animation-duration': '0.5s', 'animation-fill-mode': 'forwards','left': '0'})

		// loop ���ԍ��ŕ\������ׁAanimation-delay���C�����C���Œǉ�
		$(this).next('.child_menu.gnav_submenu').find('li').each(function (key, value) {
			var this_list = $(this);

			try {

				this_list.addClass('is-active').css({
					'animation-delay': (20 * key) + 200 + 'ms',

				})

				if ($('.js-submenu-open').onclick) {
					throw new error();
				}

			} catch (error) {
				return;
			}
		});
	}
	else {
		$('.has-child ul.gnav_submenu').find('li').removeClass('is-active')
		$('.gnav_submenu').css({ 'animation-name': '', 'animation-duration': '', 'animation-fill-mode': '' ,'left': ''})

		$(this).next('.child_menu.gnav_submenu').find('li').each(function (key, value) {

			var this_list = $(this);
			this_list.removeClass('is-active').attr('style', '');

		});

	}
});



	  //�`�F�b�N�{�b�N�X����
	$('.color_checkbtn').on('click', function() {
	if ($(this).prop('checked')){
		$('.color_checkbtn').prop('checked', false);
		$(this).prop('checked', true);
	}
	});
	window.addEventListener('pageshow', function (event) {
		if (event.persisted) {
			$('.gnav_submenu').removeClass('is-open');
			$('.gnav__hamburgerMenu,.fs-l-header__gnavContainer,.bg_bk_cover,body,.fs-p-headerNavigation').removeClass('active');
		}
	  });
	  $('.clear__btn').on('click', function(){
		document.forms['item_search_form'].reset();
			
		  $("#fs_input_productSearchKeyword,#fs_input_productSearchPrice1,#fs_input_productSearchPrice2").val("");
		});


});
// import 20220410 sp-drawer
import './lib/sp-drawer.js';


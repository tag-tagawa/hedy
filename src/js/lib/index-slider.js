$(document).on('readystatechange', function () {
	// 実行したい処理..

	// interactiveに変化したときだけ実行
	//	if (document.readyState === 'interactive') {
	// 実行したい処理..
	//	}

	// completeに変化したときだけ実行
	if (document.readyState === 'complete') {
		// 実行したい処理..

		//console.log($('#_rcmdjp_display_1 .js-item-slider'));
		checkBreakPoint();
	}
});

// ウインドウがリサイズする度にチェック
$(window).resize(function () {
	checkBreakPoint();
});

function checkBreakPoint() {

	var w = $(window).width();

	if (w <= 767) {

		// スマホ向け（767px以下のとき）


		if ($('#_rcmdjp_display_1 .js-item-slider')) {

			$('#_rcmdjp_display_1 .js-item-slider').slick({
				cssEase: 'cubic-bezier(0.45, 0, 0.55, 1)',
				dots: false,
				infinite: true,
				speed: 500,
				slidesToShow: 2,
				swipe: true,
				swipeToSlide: true,
				centerMode: false,
				variableWidth: true,
				prevArrow: '<button class="slick-prev slick-arrow" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="11.84" height="7.368" viewBox="0 0 11.84 7.368"><path d="M685.179,827.868l-1.405-1.423,4.527-4.471-4.531-4.531,1.414-1.414,5.954,5.954Z" transform="translate(-816.029 691.137) rotate(-90)" /></svg></button>',
				nextArrow: '<button class="slick-next slick-arrow" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="11.84" height="7.368" viewBox="0 0 11.84 7.368"><path d="M685.179,827.868l-1.405-1.423,4.527-4.471-4.531-4.531,1.414-1.414,5.954,5.954Z" transform="translate(-816.029 691.137) rotate(-90)" /></svg></button>',
			});

		}

		if ($('#_rcmdjp_display_3 .js-item-slider')) {

			$('#_rcmdjp_display_3 .js-item-slider').slick({
				cssEase: 'cubic-bezier(0.45, 0, 0.55, 1)',
				dots: false,
				infinite: true,
				speed: 500,
				slidesToShow: 2,
				swipe: true,
				swipeToSlide: true,
				centerMode: false,
				variableWidth: true,
				prevArrow: '<button class="slick-prev slick-arrow" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="11.84" height="7.368" viewBox="0 0 11.84 7.368"><path d="M685.179,827.868l-1.405-1.423,4.527-4.471-4.531-4.531,1.414-1.414,5.954,5.954Z" transform="translate(-816.029 691.137) rotate(-90)" /></svg></button>',
				nextArrow: '<button class="slick-next slick-arrow" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="11.84" height="7.368" viewBox="0 0 11.84 7.368"><path d="M685.179,827.868l-1.405-1.423,4.527-4.471-4.531-4.531,1.414-1.414,5.954,5.954Z" transform="translate(-816.029 691.137) rotate(-90)" /></svg></button>',
			});
		}


	} else {

		// PC向け
		if ($('#_rcmdjp_display_1 .js-item-slider.slick-initialized')) {
			$('#_rcmdjp_display_1 .js-item-slider.slick-initialized').slick('unslick');
		}

		if ($('#_rcmdjp_display_3 .js-item-slider.slick-initialized')) {
			$('#_rcmdjp_display_3 .js-item-slider.slick-initialized').slick('unslick');
		}


	}
}

// tabs 
const jstabs = document.querySelectorAll('.js-tabs')
const tab_duration = .6;
var tabsevent;
if (jstabs.length) {

	for (let i = 0; i < jstabs.length; i++) {

		jstabs[i].addEventListener('click', function (e) {

			//	console.log('tab click');

			var target = e.currentTarget;
			var target_hash = target.hash;
			var target_tab = document.getElementById(target_hash.replace('#', ''));
			target_tab.style.display = 'block';
			var target_tab_height = target_tab.scrollHeight;
			var active_tab = document.querySelectorAll('.js-tabs-content.is-open');
			var active_tab_height = active_tab[0].scrollHeight;

			var active_tab_head = document.querySelectorAll('.js-tabs.is-active');

			var opening_tab = document.querySelectorAll('.js-tabs-content.is-opening');


			if (opening_tab.length) {

				//	console.log(opening_tab);

				for (let j = 0; j < opening_tab.length; j++) {

					//		console.log(opening_tab[j]);

					tabsevent.kill(opening_tab[j], 'height');
					//tab_animation.kill();
					opening_tab[j].style.removeProperty('height');
					opening_tab[j].style.removeProperty('display');
					opening_tab[j].classList.remove('is-opening');

					active_tab_height = opening_tab[j].scrollHeight;
				}
				//	} else {
			}

			//console.log(target_tab.scrollHeight);
			//	if (tabsevent) {
			//	tabsevent.kill();
			//	}
			//console.log();

			active_tab[0].classList.remove('is-open');
			active_tab_head[0].classList.remove('is-active');
			target.classList.add('is-active');
			//	target_tab.classList.add('is-opening');
			target_tab.classList.add('is-open');

			if (target_tab_height !== active_tab_height) {

				tabsevent = gsap.fromTo(target_tab, {
					height: active_tab_height,
					//	opacity: .6
				}, {
					duration: tab_duration, // アニメーションは1秒間
					height: target_tab_height,
					//	opacity: 1,
					overwrite: true,
					onStart: function () {
						//		active_tab[0].classList.remove('is-open');
						//		active_tab_head[0].classList.remove('is-active');
						//		target.classList.add('is-active');
						target_tab.classList.add('is-opening');
						//		target_tab.classList.add('is-open');
					},
					onComplete: function () {
						target_tab.style.removeProperty('opacity');
						target_tab.style.removeProperty('display');
						target_tab.style.removeProperty('height');
						target_tab.classList.remove('is-opening');

					}, // 処理後じ実行する関数を指定
				});

			} else {

				target_tab.style.removeProperty('opacity');
				target_tab.style.removeProperty('display');
				target_tab.style.removeProperty('height');

				//	target_tab.style.removeProperty('display');
				//	target_tab.style.removeProperty('display');
				//	target_tab.style.removeProperty('height');
				//	target_tab.classList.remove('is-opening');


			}

			//tabsevent.play();

			//	}

			//	console.log(tabsevent);

			//tabsevent.kill();

			//	tabsevent.kill();

			e.preventDefault();
		});
	}

}
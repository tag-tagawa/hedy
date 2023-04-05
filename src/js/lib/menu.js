

// gnav event

const menu_children = document.querySelectorAll('.js-has-children > a')

let menu_open = false;

let menu_duration = .2;

for (let i = 0; i < menu_children.length; i++) {
	menu_children[i].addEventListener('mouseenter', function (e) {
		//	console.log('hover');
		//	console.log(e.currentTarget);

		var parent_menu = e.currentTarget.parentElement
		var mega_menu = e.currentTarget.nextElementSibling

		//	console.log(sub_menu);
		if (!menu_open) {
			menu_open = true;

			gsap.fromTo(
				mega_menu, {
				opacity: 0,
				//duration: .3, // アニメーションは1秒間
				display: 'block',
			}, {
				opacity: 1,
				//	display: 'none',
				duration: menu_duration,
				onComplete: function () {
					//	sp_drawer_menu.classList.add('is-open');
					mega_menu.style.removeProperty('opacity')
					mega_menu.style.removeProperty('display')
					mega_menu.classList.add('is-open');
					//	siteheader.style.removeProperty('position');
					//	siteheader.style.removeProperty('transform');
					//dbody.removeChild(drawer_overlay);

				},
			}
			)
		}

		if (menu_open) {
			//console.log(parent_menu);

			parent_menu.addEventListener('mouseleave', function (e) {
				//	console.log('out');
				menu_open = false;

				window.setTimeout(function () {
					gsap.fromTo(
						mega_menu, {
						opacity: 1,
						//duration: .3, // アニメーションは1秒間
						display: 'block',
					}, {
						duration: menu_duration, // アニメーションは1秒間
						opacity: 0,
						display: 'none',
						onComplete: function () {
							mega_menu.style.removeProperty('opacity')
							mega_menu.style.removeProperty('display')
							mega_menu.classList.remove('is-open')
						}, // 処理後じ実行する関数を指定
					}
					)
				}, 100)
			})
		}
	})
}
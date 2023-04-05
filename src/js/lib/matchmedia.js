export let device_mode;

export const mediaQueryList = window.matchMedia("(max-width:767px)");

/**
 * listener
 *
 * @param   {[type]}  event  [event description]
 *
 * @return  {[type]}         [return description]
 */
const listener = (event) => {

	if (event.matches) {

		// 768px未満	
		device_mode = 'sp';

	} else {

		// 768px以上	
		device_mode = 'pc';

	}

	return device_mode;

};

// mediaQueryList change event
mediaQueryList.addEventListener("change", listener);

listener(mediaQueryList);
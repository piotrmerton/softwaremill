import { tns } from '../../node_modules/tiny-slider/src/tiny-slider.module'

export let events = {

	selector : ".events__list",
	navSelector : '.events__nav',
	containerSelector: '.events__calendar',

	initSlider : function() {


		//for horizontal slider to be aligned to the right edge, we need to apply fixed width to its container, otherwise
		//the container in flex box model has automated width of all it's slide items
		//this is ugly, and it would be best to settle for standard alignment of set axis to vertical


		//we don't need to iterate through all list's items and check for widest, since all elements inherit block width of parent
		let list = document.querySelector(this.selector);
		let container = document.querySelector(this.containerSelector);
		
		container.style.maxWidth = list.offsetWidth+"px";

		//now initialize slider
		let slider = tns({
			container: this.selector,
			mode: 'carousel',
			navContainer : this.navSelector,
			speed: 400,
			items: 1,
			slideBy: 1,
			autoplay: false,
			controls: false,
			nav: true,
			//autoWidth: true,
			viewportMax: 300,
			loop: false,
			//axis: 'vertical',
		});	

		//do we need to differentiate slider behavior on desktop and mobile, i.e. vertical on desktop, horizontal on mobile?

	}

}
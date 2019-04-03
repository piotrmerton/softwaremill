//import { UI } from '../ui';
import { tns } from '../../node_modules/tiny-slider/src/tiny-slider.module'

export let events = {

	selector : ".events__list",
	navSelector : '.events__nav',
	containerSelector: '.events__calendar',
	axis : null,

	initSlider : function() {

		if( document.querySelector(this.selector) === null ) return;

		//are we changing axis based on viewport width?
		//let axis = UI.windowWidth > 960 ? 'vertical' : 'horizontal';

		let settings = {
			container: this.selector,
			mode: 'carousel',
			navContainer : this.navSelector,
			speed: 400,
			items: 1,
			slideBy: 1,
			autoplay: false,
			controls: false,
			nav: true,
			loop: false,	
			//axis,		
		}


		//unfortunately we need to wait for custom fonts to load, since they dramatically alter
		//text length...
		window.onload = () => {
			//callback to ensure order of execution
			this.resizeContainer(this.selector, this.containerSelector, () => {
				let slider = tns( settings );
			});			
		}

		
		//should you need to alter slider behavior based on viewport, bind resize event
		// window.addEventListener('resize', () => { 
			
		// });

	},

	resizeContainer : function(selector, containerSelector, callback) {
		//for horizontal slider to be aligned to the right edge, we need to apply fixed width to its container, otherwise
		//the container in flex box model has automated width of all it's slide items
		//this is ugly, and it would be best to settle for standard alignment or set axis to vertical

		//we don't need to iterate through all list's items and check for widest, since all elements inherit block width of parent
		let list = document.querySelector(selector);
		let container = document.querySelector(containerSelector);
		
		container.style.maxWidth = list.offsetWidth+"px";	

		if(callback) callback();
	}

}
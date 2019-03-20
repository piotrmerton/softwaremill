
/*
 *	simple object with UI related logic 
 */

import { header } from './partials/header';
import { nav } from './partials/nav';
import { scrollTo } from './partials/scrollTo';
import { events } from './partials/events';
import { partners } from './partials/partners';
import { tabs } from './partials/tabs';

export let UI = {

	mobile : /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),
	windowWidth : window.innerWidth,
	windowHeight : window.innerHeight,
	debug : true,

	//	calculate and store viewport dimensions
	//	this method will be bound to window resize event so try not to overload it
	init : function() {

		this.windowWidth = window.innerWidth;
		this.windowHeight = window.innerHeight;

		/* 
		 *	ensures consistency of vh units on desktop and mobile BUT will result in page jump on scroll if bound to resize event,
		 *	so consider in firing just on init
		 *	see: https://css-tricks.com/the-trick-to-viewport-units-on-mobile
		 *	also: https://stackoverflow.com/a/37113430, https://bugs.webkit.org/show_bug.cgi?id=141832
		 */
		if( this.mobile ) {
			// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
			let vh = window.innerHeight * 0.01;
			// Then we set the value in the --vh custom property to the root of the document
			document.documentElement.style.setProperty('--vh', `${vh}px`);		 	
		}

		if(this.debug) console.log( 'Window width: '+this.windowWidth+ ', Window height: '+this.windowHeight );


	},

	//updates viewport-related values on window resize
	//for now just a wrapper for init(), but should you need to differentiate what happens on DOMcontentLoaded and resize events it will come in handy
	recalc : function() {

		this.init();				

	},

	header,
	nav,
	scrollTo,
	events,
	partners,
	tabs
	
}



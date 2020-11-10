//import { UI } from '../ui';
import { tns } from '../../node_modules/tiny-slider/src/tiny-slider.module'

export let gallery = {

    selector : ".gallery__slider",
    navSelector : '.gallery__nav nav',

    initSlider : function() {

        if( document.querySelector(this.selector) === null ) return;

        let settings = {
            container: this.selector,
            controlsContainer: this.navSelector,
            mode: 'carousel',
            speed: 400,
            items: 1,
            slideBy: 1,
            autoplay: false,
            controls: true,
            nav: false,
            loop: true,	
        }

        //TO DO: Should you need to initialize multiple sliders with the same class use querySelectorAll and forEach, see: https://github.com/ganlanyuan/tiny-slider/issues/103

        let slider = tns( settings );
    },
}

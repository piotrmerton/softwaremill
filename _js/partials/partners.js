import { tns } from '../../node_modules/tiny-slider/src/tiny-slider.module'

export let partners = {

    selector: '.partners__list',

    initSlider : function() {

        if( document.querySelector(this.selector) === null ) return;

        let settings = {
            container: this.selector,
            mode: 'carousel',
            speed: 300,
            items: 3,
            slideBy: 1,
            autoplay: true,
            autoplayButtonOutput : false,
            controls: false,
            nav: false,
            loop: true,	
            mouseDrag: true,	
            responsive : {
                1366 : {
                    items: 6
                },
                1080 : {
                    items : 5
                },
                640 : {
                    items : 4
                }

            }
        };

        let slider = tns( settings );
    }
}

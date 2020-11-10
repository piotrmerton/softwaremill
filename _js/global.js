//we are importing stylesheets related files here, because putting non-js files as webpack entries generate js as well, see: https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/518 
import '../_scss/global.scss';

//index related logic, for now bundled as well
import './index';

import { UI } from './ui';

// for some cases it was impossible to set equal height of elements as in design spec, so we needed to take care of it via js (i.e. services items names)
// hopefully, in future CSS subgrids spec arrives...
import MatchHeight from 'matchheight';   

document.addEventListener("DOMContentLoaded", () => { 

    UI.init();
    
    UI.header.resizeOnScroll();

    UI.nav.bind();
    
    UI.scrollTo.bind();
    
    UI.events.initSlider();

    UI.gallery.initSlider();

    UI.video.bind();


    /*
     *	for now we keep all JS logic in one bundle, but should you need Code Splitting in future, you can move code below to chunks regarding specific subpages:
     */

    //1. index
    UI.partners.initSlider();

    //2. join-us
    UI.tabs.bind('#career-tabs');

    //3. blog
    UI.tabs.bind('#blog-tabs', true);

} );


window.addEventListener('resize', () => { 
    UI.recalc() 

    /*
     *	additional measure if you need extra bulletproof mobile menu for browser manual resizing
     */
    //if(UI.windowWidth === UI.nav.mobileMenuBreakpoint) UI.nav.reset();


});


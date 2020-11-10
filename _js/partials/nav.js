import { UI } from '../ui';

export let nav = {
    //selectors
    headerSelector : '#header-top',
    navSelector : '#nav-top',	
    buttonSelector : '.do-toggle-nav',

    //classes
    hasSubmenuClass : 'item--has-submenu',
    submenuClass: 'nav__submenu',	
    openClass : 'menu--open',

    //helpers
    mobileMenuBreakpoint : 1180,
    currentViewportPosition : null,	

    /**
     *	Binds navigation links and UI
     */
    bind : function(
        headerSelector = this.headerSelector,
        navSelector = this.navSelector,
        hasSubmenuClass = this.hasSubmenuClass,
        submenuClass = this.submenuClass,
        buttonSelector = this.buttonSelector,		
    ) {

        // parent object {nav}
        let self = this;

        // cache some elements 
        let nav = document.querySelector(navSelector);
        let button = document.querySelector(buttonSelector);
 
        /* 
         *	1. bind menu UI button
         */
        if(button === null) return;

        button.addEventListener('click', (event) => {
            this.toggleMenu();
            event.preventDefault();
        });

        /* 
         *	2. bind navigation links with different logic regarding submenu based
         *	on current viewport width
         */
        if(nav === null) return;

        let navLinks = nav.querySelectorAll('a');

        navLinks.forEach( function(item) {

            let li = item.parentNode;
            
            if( li.classList.contains(hasSubmenuClass) ) {

                //bind event to <a>
                item.addEventListener('click', (event) => {

                    //logic regarding toggling submenu needed only on desktop and mobile, on tablet everything is visible so no JS required
                    if( UI.windowWidth <= 480 ) {
                        self.toggleSubmenu(li);
                        event.preventDefault();
                    } else if ( UI.windowWidth > self.mobileMenuBreakpoint  ) {
                        //on desktop toggle submenu only for highest level (not submenu)	
                        if(!li.closest('ul').classList.contains(submenuClass)) {
                            self.toggleSubmenu(li);
                            event.preventDefault();
                        }
                    }
                });

                //bind event to submenu__title for "going back"
                let submenuTitle = li.querySelector('.do-close-subnav');

                if(submenuTitle !== null) {
                    submenuTitle.addEventListener('click', (event) => {						
                        self.toggleSubmenu(li);		
                        event.preventDefault();			
                    });
                }				

            }				

        });		


    },

    /**
     * toggle mobile menu
     */
    toggleMenu : function() {
        let header = document.querySelector(this.headerSelector);
        header.classList.contains(this.openClass) ? this.closeMenu() : this.openMenu();
    },	

    /**
     *	opens mobile menu
     */
    openMenu : function() {

        let header = document.querySelector(this.headerSelector);
        let button = document.querySelector(this.buttonSelector);

        //save scroll position
        this.currentViewportPosition = window.pageYOffset;

        //jump to the top of the page
        scroll(0, 0);	

        document.body.classList.add(this.openClass);
        header.classList.add(this.openClass);
        button.classList.add(this.openClass);


    },

    /**
     * closes mobile menu
     */
    closeMenu : function() {

        this.reset();

        //set previous scroll position
        scroll(0, this.currentViewportPosition);		

    },


    toggleSubmenu : function (el) {

        let header = document.querySelector(this.headerSelector);
        let parent = el.parentNode;
        let openClass = this.openClass;

        //select siblings based on current <li>
        let siblings = Array.prototype.filter.call(el.parentNode.children, function(child){
            return child !== el;
        });			

        //remove open class from siblings
        siblings.forEach( function(sibling) {
            sibling.classList.remove(openClass);
        });


        if (!el.classList.contains(openClass)) {
            el.classList.add(openClass);	
            // add helper class parent as well
            parent.classList.add(openClass);
        } else {
            el.classList.remove(openClass);
            parent.classList.remove(openClass);
        }
        
        //	some ugly trickery to match design spec: alter header height in order for header background to span across absolutely positioned submenu;
        //	initially we added pseudoelement with its own bg attached to submenu but bg transitions on desktop get mismatched for some reason, probably due to fixed header "offset"
        header.removeAttribute('style');

        if( UI.windowWidth > this.mobileMenuBreakpoint) {

        let submenu = el.querySelector('ul');
        let submenuHeight = submenu.offsetHeight;
        let headerHeight = header.offsetHeight
                
            if (el.classList.contains(openClass)) {
                header.style.height = submenuHeight + headerHeight +"px";
            }

        }

    },

    /* reset all elements to default state */
    reset : function() {

        let button = document.querySelector(this.headerSelector);
        let header = document.querySelector(this.buttonSelector);
        let nav = document.querySelector(this.navSelector);
        
        document.body.classList.remove(this.openClass);
        header.removeAttribute('style');
        header.classList.remove(this.openClass);
        button.classList.remove(this.openClass);			

        let navOpenItems = nav.querySelectorAll('.'+this.openClass);
        
        navOpenItems.forEach( (item) => {
            item.classList.remove(this.openClass);
        });

    }
}

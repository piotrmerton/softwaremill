export let tabs = {

	selector : '#career-tabs',
	tabSelector : '.item--tab',
	buttonSelector : '.do-toggle-tab',
	activeClass : 'tab--active',
	animate : true,

	bind : function(selector = this.selector, dynamicContent = false) {

		if( document.querySelector(selector) === null ) return;

		let self = this;
		let tabContainer = document.querySelector(selector);
		
		let buttons = tabContainer.querySelectorAll(self.buttonSelector);

		buttons.forEach( (button) => {

			button.addEventListener('click', function(event) {

				let target = event.target;
				let tab = target.closest('.item--tab');
				
				self.toggleTab(tab);

				event.preventDefault();

			});

		});

		if(dynamicContent) {
			self.hideUI(selector);

			//bind to resize event as well because on different devices we are showing different amount of defaulty visible keywords
			window.addEventListener('resize', () => { 

				//TO DO: resets tabs on resize as well?

				self.hideUI(selector);
			});

		}

	},

	/*
	 *	for dynamic content (i.e. blog keywords/authors) hide tab__ui if it's unnecessary 
	 *	(there's no need to "toggle" anything if there is only couple of keywords - we are testing this by comparing heights of visible and full containers)
	 *
	 */
	hideUI : function(selector = this.selector) {

		let self = this;

		let tabContainer = document.querySelector(selector);
		let tabs = tabContainer.querySelectorAll(self.tabSelector);
		

		tabs.forEach( (tab) => {

			let tabContent = tab.querySelector('.item__body');
			let tabUi = tab.querySelector('.tab__ui');
			

			if( tabContent === null ) return;

			let contentVisibleHeight = tabContent.offsetHeight;
			let contentFullHeight = tabContent.scrollHeight;

			let style = getComputedStyle(tabContent.querySelector('.list__item'));

			//since we can't use grid model for keywords we need to take into acount forced margin of each tag item and 
			//make sure that the difference of heights is bigger than margin itself
			if( 
				(contentVisibleHeight >= contentFullHeight || contentFullHeight - contentVisibleHeight <= parseInt(style.marginBottom)) 
				&& !tab.classList.contains(self.activeClass) ) {

				tabUi.style.display = "none";

			} else {
				tabUi.removeAttribute('style');
			}

			//update tab height as well, but only if tab is active
			if( tab.classList.contains(self.activeClass ))
			tabContent.style.maxHeight = contentFullHeight+"px";
			

		});		
	},

	toggleTab : function(tab) {

		tab.classList.toggle(this.activeClass);

		if( tab.classList.contains(this.activeClass) ) {

			this.openTab(tab);

		} else {

			this.closeTab(tab);

		}		

	},

	openTab : function(tab) {

		tab.setAttribute('data-collapsed', 'false');

		let tabContent = tab.querySelector('.item__body');

		//because we are using transition animation for toggling, we need to explicitly set height of the content for animation to be precise

		//get the height of the element's inner content, regardless of its actual size, including content not visible on the screen due to overflow
		
		if( this.animate ) {
			let contentHeight = tabContent.scrollHeight;
			tabContent.style.maxHeight = contentHeight+"px";			
		}
	},

	closeTab : function(tab) {

		tab.setAttribute('data-collapsed', 'true');

		let tabContent = tab.querySelector('.item__body');

		if( this.animate ) tabContent.removeAttribute('style');

	}
}

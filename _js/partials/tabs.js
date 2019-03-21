export let tabs = {

	selector : '#career-tabs',
	buttonSelector : '.do-toggle-tab',
	activeClass : 'tab--active',
	animate : true,

	bind : function() {

		if( document.querySelector(this.selector) === null ) return;

		let self = this;
		let tabs = document.querySelector(self.selector);

		let buttons = tabs.querySelectorAll(self.buttonSelector);

		for(let i = 0; i < buttons.length; i++) {

			buttons[i].addEventListener('click', function(event) {

				let target = event.target;
				let tab = target.closest('.item--tab');
				
				self.toggleTab(tab);

				event.preventDefault();

			});

		}


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
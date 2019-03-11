import ScrollOut from "scroll-out";

export let header = {

	headerClass : 'header-top',
	toggleClass : 'header--fixed',

	resizeOnScroll : function() {

		let self = this;

		ScrollOut({
			targets: '.'+self.headerClass,
			onShown(el) {
				el.classList.remove(self.toggleClass);
			},
			onHidden(el) {
				
				el.classList.add(self.toggleClass);
			},	  
			//offset : 0,
		});

	}

}
export let scrollTo = {
	selector : '.do-scroll-to',
	offset : 100, //height of a fixed header (TO DO: get it dynamically via el.offsetHeight, possibly take windowWidth into account as well)

	/**
	 * @param {string} selector of an element(s) to bind to
	 */
	bind : function(selector = this.selector, offset = this.offset) {

		let buttons = document.querySelectorAll(selector);

		for(let i = 0; i < buttons.length; i++) {

			buttons[i].addEventListener('click', function(event) {

				let target = buttons[i].dataset.scrollTarget;

				window.scrollTo({
					top: document.querySelector('.'+target).offsetTop - offset,
					behavior: 'smooth',
				});				
				
				event.preventDefault();			

			});
		}

	}
}
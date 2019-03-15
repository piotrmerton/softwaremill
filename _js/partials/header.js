import ScrollOut from "scroll-out";



export let header = {

	headerClass : 'header-top',
	fixedClass : 'header--fixed',
	state : 'visible',

	resizeOnScroll : function() {

		let self = this;
		let header = document.querySelector('.'+this.headerClass);

		window.addEventListener('scroll', () => {
			if( window.pageYOffset === 0) header.classList.remove('header--scrolling');
		});

		ScrollOut({
			targets: '.'+self.headerClass,
			onShown : (el, context, scrollingElement) => {


				//el.classList.add(self.fixedClass);

				el.classList.add(self.fixedClass, 'header--scrolling', 'slideInDown');
				this.state = 'fixed';

				//remove animation class on completion time
				setTimeout( () => {
					el.classList.remove('slideInDown');
				}, 500);


			},
			onHidden : (el, context, scrollingElement) => {
				
				let direction = scrollingElement.dataset.scrollDirY;
				el.classList.remove(self.fixedClass);
				

				// on scrolling up, keep header fixed but for nice transition, but without white bg
				// if(direction === "-1") {					
				// 	el.classList.remove('header--scrolling');
				// }

				//slide out animation disabled for now, if user scroll up faster than animation itself, we will see ugly flash of header changing its position
				// if(this.state === 'fixed') {
				// 	el.classList.add('slideOutUp');
				// 	this.state = 'hidden';
				// }

				//remove animation class on completion time
				// setTimeout( () => {
				// 	el.classList.remove(self.fixedClass, 'slideOutUp');
				// }, 200);			

			},	  
			offset : 200,
		});



	}

}
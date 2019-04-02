export let video = {

	componentSelector : '.video',
	playerSelector : '.video__player',
	buttonSelector : '.do-play-video',

	players : [], //store players in array instead of single instance to allow control of multiple instances


	/*	
	 *	initializes YouTube iframe API
	 *	https://developers.google.com/youtube/iframe_api_reference#Getting_Started
	 */
	init : function() {

		let tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
      	
      	let firstScriptTag = document.getElementsByTagName('script')[0];

      	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	},

	bind : function() {

		if( document.querySelector(this.componentSelector) === null ) return;

		let self = this;

		//init youtube api
		this.init();

		//bind video play logic to buttons
		let buttons = document.querySelectorAll(this.buttonSelector);

		buttons.forEach( function(item) {

			item.addEventListener('click', function(event) {

				let parent = this.closest(self.componentSelector);
				let videoId = parent.dataset.videoId;
				let player = parent.querySelector(self.playerSelector);

				//TO DO: first check whether to play video in playerSelector or in modal?

				if( parent.dataset.state === 'paused' ) {
					self.resume(videoId);
				} else {
					self.play(player, videoId);
				}

				

				event.preventDefault();

			});

		});

	},

	play : function(player, videoId) {

		let self = this;
		let parent = player.closest(self.componentSelector);

		//update state immediately on button click rather than waiting for YT response,
		//at worst case scenario user will see yt preloader/buffering state but won't perceive
		//that "nothing is happeing"
		parent.dataset.state = 'started';

		this.players.push( { 
				videoId,
				'player' : new YT.Player(
				player, 
				{
					videoId: videoId,
					width: '100%',
					height: '100%',
					playerVars: {
						controls: 1,
						autoplay: 1,
						rel: 0,
						showinfo: 0,
						modestbranding: 1
		      		},
			         events: {
			            'onStateChange': (event) => {
			            	self.updateState(event, parent, self)
			            }
			         }	      		
				}
			)



		} );		

	},

	resume : function(videoId) {
		if(!this.players.length) return;

		let video = this.players.find(player => player.videoId === videoId);

		video.player.playVideo();

	},

	updateState : (event, parent, self) => {

		if( event.data == YT.PlayerState.PLAYING ) {
			parent.dataset.state = 'playing';
		}

		if( event.data == YT.PlayerState.PAUSED) {

			// //update state if video is paused but only after couple of second to avoid toggling back poster while interacting with progress bar
			setTimeout( () => {

				//check if video is still paused...
				let videoId = parent.dataset.videoId;
				let video = self.players.find(player => player.videoId === videoId);

				if( video.player.getPlayerState() == YT.PlayerState.PAUSED ) {
					parent.dataset.state = 'paused';
				}

			}, 10000);
			
		
		}

		if( event.data == YT.PlayerState.ENDED ) {
			parent.dataset.state = 'ended';			
		}

	}

}
	function getSoundCloud(url){
		// ## SoundCloud
		// Pass a consumer key, which can be created [here](http://soundcloud.com/you/apps), and your playlist url.
		// If your playlist is private, make sure your url includes the secret token you were given.
		
	//	var consumer_key = "ePT3qXXTOjw4ZoZcN7ALQ",	

		var client_id = "bbb313c3d63dc49cd5acc9343dada433";
		
		// Resolve the given url and get the full JSON-worth of data from SoundCloud regarding the playlist and the tracks within.
		
		$.getJSON('http://api.soundcloud.com/resolve?url=' + url + '&format=json&consumer_key=' + client_id + '&callback=?', function(playlist){
				
			// I like to fill out the player by passing some of the data from the first track.
			// In this case, you'll just want to pass the first track's title.
			
			popup.append(playlist.tracks[0].title);
			
			// Loop through each of the tracks
			/*
			$.each(playlist.tracks, function(index, track) {
				
				// Create a list item for each track and associate the track *data* with it.
				
				$('<li>' + track.title + '</li>').data('track', track).appendTo('.tracks');
				
				// * Get appropriate stream url depending on whether the playlist is private or public.
				// * If the track includes a *secret_token* add a '&' to the url, else add a '?'.
				// * Finally, append the consumer key and you'll have a working stream url.

				url = track.stream_url;
				
				(url.indexOf("secret_token") == -1) ? url = url + '?' : url = url + '&';
				
				url = url + 'consumer_key=' + consumer_key;
				
				// ## SoundManager2
				// **Create the sound using SoundManager2**
				
				soundManager.createSound({
					
					// Give the sound an id and the SoundCloud stream url we created above.
					
					id: 'track_' + track.id,
					url: url,
					
					// On play & resume add a *playing* class to the main player div.
					// This will be used in the stylesheet to hide/show the play/pause buttons depending on state.
					
					onplay: function() {
						
						$('.player').addClass('playing');
						
						$('.title').text(track.title);
						
					},
					onresume: function() {
						
						$('.player').addClass('playing');
						
					},
					
					// On pause, remove the *playing* class from the main player div.
					
					onpause: function() {
						$('.player').removeClass('playing');
					},
					
					// When a track finished, call the Next Track function. (Declared at the bottom of this file).
					
					onfinish: function() {
						nextTrack();
					}
					
				});
				
			});*/
			
		});

}
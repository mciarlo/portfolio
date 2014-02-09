$(function () {
	var $window = $(window),
		$body = $('body'),
		windowWidth = $window.outerWidth(),
		windowHeight = $window.outerHeight(),
		$overlay = $('#video-overlay'),
		onScroll,
		showVideoPlayer,
		showReplayButton,
		prepareVideo,
		onVideoEnd,
		DELAY = 10,
		$rddPlayer = $("#rdd-video-player"),
		$replayBtn = $('#replay-video'),
		activeVideo,
		shouldPlayInline = false;

	onScroll = function () {
		var scrollTop = $window.scrollTop();

		if ($('#container').hasClass('arc90')) {
			if (scrollTop > $('#narratives').offset().top) {
				if (!$('#me').hasClass('hidden')) {
					$('#me').addClass('hidden');
				}
			} else {
				$('#me').removeClass('hidden');
			}
		}
	};

	onResize = function () {
		windowWidth = $window.outerWidth();
		shouldPlayInline = windowWidth < 768;
	};

	// Show the video player is necessary and scroll into view

	showVideoPlayer = function () {
		if ($rddPlayer.is(":visible") || shouldPlayInline) {
			return;
		}

		$body.animate({
			scrollTop: $rddPlayer.offset().top
		}, 200, function () {
			$rddPlayer.slideDown();
		})
	};

	showReplayButton = function () {
		$replayBtn.show();
	};

	onVideoEnd = function () {
		if (!shouldPlayInline) {
			showReplayButton();
		} else {
			$(activeVideo).next('a:first').fadeIn();
			$(activeVideo).hide();
		}
	};

	prepareVideo = function () {
		// Reset all videos to hidden
		$rddPlayer.find('video').hide();

		// Show our active video
	    $(activeVideo).fadeIn();

	    if (shouldPlayInline) {
	    	$(activeVideo).next('a:first').hide();
	    }

	    // Show the replay button on end
	    activeVideo.addEventListener('ended', onVideoEnd);
	};

	$('.play-video-btn').click(function (ev) {
		ev.preventDefault();

		if (activeVideo) {
			activeVideo.removeEventListener('ended');
		}

		// Reset the replay button
		$replayBtn.hide();

	    var $this = $(this),
	        video = shouldPlayInline ? $this.data('video-element') + "-inline" : $this.data('video-element');

	    activeVideo = document.getElementById(video);

	    // Prepare our video
	    prepareVideo();

	    // Show the player if necessary
	    showVideoPlayer();

	    if (activeVideo.paused) {
	      activeVideo.play();
	    } else {
	      activeVideo.pause();
	    }
	  });

	$replayBtn.click(function (ev) {
		ev.preventDefault();

		var el = $rddPlayer.find('video:visible');

		if (el.length) {
			$replayBtn.hide();
			el[0].play();
		}
	});

	onResize();

	$window.scroll(onScroll);
	$window.resize(onResize);
});
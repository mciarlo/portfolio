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
		playVideo,
		DELAY = 10,
		SLIDE_DURATION = 300,
		SCROLL_DURATION = 250,
		FADE_SPEED = 150,
		MIN_INLINE_WIDTH = 748,
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
		shouldPlayInline = windowWidth < MIN_INLINE_WIDTH;
	};

	// Show the video player is necessary and scroll into view

	showVideoPlayer = function () {
		if ($rddPlayer.is(":visible") || shouldPlayInline) {
			playVideo();
			return;
		}

		$body.animate({
			scrollTop: $('#rdd-videos').offset().top
		}, SCROLL_DURATION, function () {
			$rddPlayer.slideDown(SLIDE_DURATION, function () {
			    playVideo();
			});
		})
	};

	playVideo = function () {
		activeVideo.play();

		// Show the replay button on end
	    activeVideo.addEventListener('ended', onVideoEnd);
	}

	showReplayButton = function () {
		$replayBtn.show();
	};

	onVideoEnd = function () {
		if (!shouldPlayInline) {
			showReplayButton();
		} else {
			$(activeVideo).next('a:first').fadeIn(FADE_SPEED);
			$(activeVideo).hide();
		}
	};

	prepareVideo = function () {
		// Reset all videos to hidden
		$rddPlayer.find('video').hide();

		$(activeVideo).show();

		// Show our active video
		$(activeVideo).fadeIn(FADE_SPEED, function () {
			// Show the player if necessary
			showVideoPlayer();
		});

	    if (shouldPlayInline) {
	    	$(activeVideo).next('a:first').hide();
	    }
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
$(function () {
	var $window = $(window),
		windowWidth = $window.outerWidth(),
		windowHeight = $window.outerHeight(),
		$overlay = $('#video-overlay'),
		onScroll,
		SCROLL_DELAY = 10,
		RESUME_STOP = 3190;

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

		if ($('#resume').length) {
			if (scrollTop > RESUME_STOP) {
				if (!$('#headshot').hasClass('absolute')) {
					$('#headshot').addClass('absolute');
				}
			} else {
				$('#headshot').removeClass('absolute');
			}
		}
	};

	$('.interaction-video .video-icon').click(function (ev) {
	    var $this = $(this),
	        video = $this.data('video-element'),
	        videoEl = document.getElementById(video),
	        showButton = function () {
	          $this.fadeIn(BUTTON_FADE_SPEED);
	        };

	    videoEl.addEventListener('ended', showButton);

	    if (videoEl.paused) {
	      videoEl.play();
	      $this.fadeOut(BUTTON_FADE_SPEED);
	    } else {
	      videoEl.pause();
	    }
	  });

	$window.scroll(_.throttle(onScroll, SCROLL_DELAY));
});
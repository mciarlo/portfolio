$(function () {
	var $window = $(window),
		windowWidth = $window.outerWidth(),
		windowHeight = $window.outerHeight(),
		$overlay = $('#video-overlay'),
		onScroll;

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

	$window.scroll(_.throttle(onScroll, 50));
});
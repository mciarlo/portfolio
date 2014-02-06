$(function () {
	var $window = $(window),
		windowWidth = $window.outerWidth(),
		windowHeight = $window.outerHeight(),
		$overlay = $('#video-overlay');

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

	// $window.scroll(function () {
	// 	var height = $('#reuters-parallax img:first').outerHeight(),
	// 		offset = $('#reuters-parallax').offset().top,
	// 		scrollTop = $window.scrollTop(),
	// 		distance = scrollTop - offset;

	// 	distance = distance > windowHeight ? windowHeight : distance;

	// 	if (offset < scrollTop) {
	// 		$('#reuters-parallax img:first').css('top', - (distance * (height / windowHeight)));
	// 	}
	// });
});
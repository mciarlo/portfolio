$(function () {
	var $window = $(window),
		imageActivationOffset,
		isElementInViewport,
		loadImage,
		WIDTH_TO_DISABLE_EFFECTS = 768,
		SCROLL_ANIMATION_DURATION = 250,
		MAX_ILLUSTRATION_HERO_1_ROTATION_ANGLE = 6,
		START_ILLUSTRATION_HERO_1_ROTATION_ANGLE = 0,
		MAX_ILLUSTRATION_HERO_2_ROTATION_ANGLE = -6,
		START_ILLUSTRATION_HERO_2_ROTATION_ANGLE = 0,
		HERO_IMAGE_REVEAL_DELAY = 400,
		NAV_DELAY = 400,
		$workflow = $('.doo-workflow').first(),
		preventDefaultFormAction = function (ev) {
			ev.preventDefault();
			ev.stopPropagation();
		};

	isElementInViewport = function (el) {
		var rect = el.getBoundingClientRect();

    	return (rect.bottom > 0 && rect.bottom < window.innerWidth) ||
        	(rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.top > 0);
	};

	loadImage = function (imageEl) {
		var $image = $(imageEl);

		$image.load(function() {
	  		if (this.getAttribute("src").indexOf("hero") > 0) {
	  			setTimeout(function () {
					$image.removeClass('invisible');
				}, HERO_IMAGE_REVEAL_DELAY);

	  		} else {
	    		$image.removeClass('invisible');
	  		}
	  	});
	}

	imageActivationOffset = function () {
		return $window.height() * .25;
	};

	$('body').removeClass('no-js');

	// $workflow.textDynamics(function () {
	// 	return $window.outerHeight() * 0.5;
	// }, function () {
	// 	$workflow.find('.lazy-load').trigger("unveil");
	// });

	if ($('img.lazy-load').length > 0) {
		// Lazy load major image assets
	  	$("img.lazy-load").unveil(imageActivationOffset(), function() {
	  		loadImage(this);
		});
	}
});
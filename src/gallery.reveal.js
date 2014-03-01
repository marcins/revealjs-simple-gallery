(function() {
	if( typeof window.addEventListener === 'function' ) {
		Reveal.addEventListener("slidechanged", function (event) {
			if (event.previousSlide.querySelector('.gallery') || document.querySelector('.reveal > .gallery')) {
				Gallery.stop();
			}

			Gallery.start(event.currentSlide);
		});

		// during initial load
		if (Reveal.getCurrentSlide()) {
			Gallery.start(Reveal.getCurrentSlide());
		}
	}
})();
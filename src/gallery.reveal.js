(function() {
	if( typeof window.addEventListener === 'function' ) {
		Reveal.addEventListener("slidechanged", function (event) {
			if (event.previousSlide.querySelector('.gallery') || document.querySelector('.reveal > .gallery')) {
				Gallery.stop();
			}

			var galleryNode = event.currentSlide.querySelector('.gallery');
			if (galleryNode) {				
				Gallery.start(galleryNode);
			}

		});

		// during initial load
		if (Reveal.getCurrentSlide()) {
			var galleryNode = Reveal.getCurrentSlide().querySelector('.gallery');
			if (galleryNode) {
				Gallery.start(galleryNode);
			}
		}
	}
})();
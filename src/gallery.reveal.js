(function() {
	if( typeof window.addEventListener === 'function' ) {
		var slidesNode = document.querySelector(".slides");
		Reveal.addEventListener("slidechanged", function (event) {
			var galleryNode = event.previousSlide.querySelector('.gallery') || document.querySelector('.reveal > .gallery');
			if (galleryNode) {
				Gallery.stop(galleryNode, slidesNode);
			}

			galleryNode = event.currentSlide.querySelector('.gallery');
			if (galleryNode) {				
				Gallery.start(galleryNode, slidesNode);
			}

		});

		// during initial load
		if (Reveal.getCurrentSlide()) {
			var galleryNode = Reveal.getCurrentSlide().querySelector('.gallery');
			if (galleryNode) {
				Gallery.start(galleryNode, slidesNode);
			}
		}
	}
})();
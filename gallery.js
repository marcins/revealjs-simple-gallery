(function() {
	if( typeof window.addEventListener === 'function' ) {
		var galleryTimer;

		var galleryStep = function (items, iterations) {
			var length = items.length,
				ptr = 0,
				loops = 0;

			return function () {
				if (iterations > 0 && loops === iterations) {
					return;
				}
				items[ptr].className = "inactive";
				if (ptr === length - 1) {
					loops++;
					if (iterations === 0 || loops < iterations) {
						ptr = 0;
					}
				} else {
					ptr++;
				}
				items[ptr].className = "active";
			};
		};

		var startupGallery = function (slide) {
			var galleryNode = slide.querySelector('.gallery');
			if (!galleryNode) return; // early exit if no gallery

			var items = Array.prototype.slice.apply(galleryNode.querySelectorAll("li"));
			items.forEach(function (item, index) {
				if (index === 0) {
					item.className = "active";
				} else {
					item.className = "inactive";
				}
				var label = item.querySelector("label");
				if (!label) {
					var img = item.querySelector("img");
					label = document.createElement("label");
					label.innerHTML = img.attributes.alt.value;
					item.appendChild(label);
				}
			});

			var iterations = galleryNode.dataset.iterations ? +galleryNode.dataset.iterations : 1;
			console.log("Iterations is", iterations);
			var interval = (galleryNode.dataset.interval || 1) * 1000;
			galleryTimer = setInterval(galleryStep(items, iterations), interval);
		};

		Reveal.addEventListener("slidechanged", function (event) {
			if (event.previousSlide.querySelector('.gallery')) {
				// cleanup
				clearInterval(galleryTimer);
			}

			startupGallery(event.currentSlide);
		});

		if (Reveal.getCurrentSlide()) {
			startupGallery(Reveal.getCurrentSlide());
		}
	}
})();
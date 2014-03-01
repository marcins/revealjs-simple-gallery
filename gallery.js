(function() {
	if( typeof window.addEventListener === 'function' ) {
		var galleryTimer;

		var galleryStep = function (items, iterations) {
			var length = items.length,
				ptr = 0,
				loops = 0;

			return function () {
				if (loops === iterations) {
					return;
				}
				items[ptr].className = "inactive";
				if (ptr === length - 1) {
					loops++;
					if (loops < iterations) {
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
			console.log("Startup gallery with node", galleryNode);

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

			galleryTimer = setInterval(galleryStep(items, 1), (galleryNode.dataset.interval || 1) * 1000);
		};

		Reveal.addEventListener("slidechanged", function (event) {
			var galleryNode = event.previousSlide.querySelector('.gallery');

			if (galleryNode) {
				console.log("Gallery on last slide, cleaning up");
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
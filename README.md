# Simple Gallery Plugin for reveal.js

I wanted to show a small gallery inside a reveal.js presentation (slideshow within a slideshow - Inception!).  This is a simple plugin that takes a list of images and converts it to an auto-advancing slideshow.

Check out an [example of the different variations](http://junkheap.net/examples/revealjs-gallery/)

## Why?

Why not?

Seriously though, could just do a sequence of regular slides with an auto-advance to get the same effect, so why not? Well first of all I didn't think of it until it was too late, and secondly this keeps the slide deck a bit neater. You can easily skip past the whole slideshow by using the keyboard controls, whereas with auto-advance you'd need to jump through all the slides.

## Installing

 * copy `gallery.plugin.js` to `plugin/gallery/gallery.plugin.js` in your reveal.js presentation
 * copy `gallery.css` to `plugin/gallery/gallery.css` or integrate into your CSS your preferred way, customise the styles as required. You will need to set the width and height of the `.gallery` selector to match the natural size of your presentation defined in `reveal.js`
 * add the following to the head of `index.html` after other stylesheets are loaded:
 ```<link rel="stylesheet" href="plugin/gallery/gallery.css">```
 * add the following to the bottom of `index.html`, where the other plugins are defined:
```js
{ src: 'plugin/gallery/gallery.plugin.js', async: true, condition: function() { return !!document.querySelector('.gallery'); } }
```
 * add a gallery somewhere in your slide:

```html
<ul class="gallery" data-interval="0.7" data-iterations="1">
	<li><img src="images/image1.jpg" alt="Caption 1"></li>
	<li><img src="images/image2.jpg" alt="Caption 2"></li>
	<li><img src="images/image3.jpg" alt="Caption 3"></li>
</ul>
```

The gallery plugin will take the alt tags in your images and convert them to `label` elements within the `li`.

## Configuring

Configuration options are set as data elements on the `<ul>`:

* **data-interval** a Number which determines how long each slide is shown for (in seconds) - default is 1.0
* **data-iterations** how many times to loop through the slideshow - default is once and stop on the last slide. Set
 to 0 to repeat indefinitely
* **data-mode** supported values are "normal" and "full-screen", with normal being default if the attribute isn't present

You can also customise how the labels will look by editing the `label` style in `gallery.css`.

### Full Screen Mode

This is a bit of a hack, basically when the gallery's mode is "full-screen" and you enter a slide with the gallery it is taken out of the slide flow and inserted into the DOM before the slides element. The images are hidden and their sources are applied as backgrounds on the `li` instead, to allow them to be center cropped via CSS. Animation continues as normal, which wouldn't have been possible with a slide background.

When you exit the slide with a gallery the element is returned back into the slide where it was - order is restored!

Your mileage may vary with the behaviour of any of the keyboard commands except going back and forth between slides when in full screen mode, as reveal.js now has an unexpected element in an unexpected place.

## Contributing

### Building

Just for kicks this codebase is a bit overengineered. The Reveal specific code has been split from the generic Gallery code to allow it to be tested.  Gallery code is in `src/gallery.js`, Reveal plugin code is in `src/gallery.reveal.js`. To build a single JS file for use with Reveal there is a `Makefile` - so just run `make` in the root of the project and you'll get a `gallery.plugin.js`.

### Testing

Tests are browser based using Mocha & Chai, run these by running `tests/index.html`.
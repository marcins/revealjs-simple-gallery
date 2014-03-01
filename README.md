# Simple Gallery Plugin for reveal.js

I wanted to show a small gallery inside a reveal.js presentation (slideshow within a slideshow - Inception!).  This is a simple plugin that takes a list of images and converts it to an auto-advancing slideshow.

## Installing

 * copy `gallery.plugin.js` to `plugins/gallery/gallery.plugin.js` in your reveal.js presentation
 * copy `gallery.css` to `plugins/gallery/gallery.css` or integrate into your CSS your preferred way, customise the styles as required. You will need to set the width and height of the `.gallery` selector to match the natural size of your presentation defined in `reveal.js`
 * add the following to the head of `index.html` after other stylesheets are loaded:
 ```<link rel="stylesheet" href="plugins/gallery/gallery.css">```
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

There's only really two configurable options at the moment, both set as data elements on the `<ul>`:

* **data-interval** a Number which determines how long each slide is shown for (in seconds) - default is 1.0
* **data-iterations** how many times to loop through the slideshow - default is once and stop on the last slide. Set
 to 0 to repeat indefinitely

You can also customise how the labels will look by editing the `label` style in `gallery.css`.

## Contributing

### Building

Just for kicks this codebase is a bit overengineered. The Reveal specific code has been split from the generic Gallery code to allow it to be tested.  Gallery code is in `src/gallery.js`, Reveal plugin code is in `src/gallery.reveal.js`. To build a single JS file for use with Reveal there is a `Makefile` - so just run `make` in the root of the project and you'll get a `gallery.plugin.js`.

### Testing

Tests are browser based using Mocha & Chai, run these by running `tests/index.html`.
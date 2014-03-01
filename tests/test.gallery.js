/*jshint expr: true */

describe('Gallery', function () {
	var expect = chai.expect;

	describe('#start', function () {
		var itemElem1, itemElem2, items, galleryElem;
		var MockItem = function (hasLabel) {
			this.hasLabel = hasLabel;
			return this;
		};
		MockItem.prototype.querySelector = function (selector) {
			if (selector === "label") {
				return this.hasLabel;
			} else if (selector === "img") {
				return {
					attributes: {
						alt: {
							value: "ALT"
						}
					}
				};
			}
		};
		MockItem.prototype.appendChild = function () {};
		var intervalStub, stepSpy;
		
		beforeEach(function () {
			/* Mock Item elements */
			itemElem1 = new MockItem(true);			
			itemElem2 = new MockItem(false);
			items = [itemElem1, itemElem2];
			/* Mock DOM Gallery element */
			galleryElem = {
				dataset: {},
				// return SOMETHING!
				querySelector: function (selector) {
					return this;
				},
				querySelectorAll: function (selector) {
					return items;
				}
			};
			intervalStub = sinon.stub(window, "setInterval");
			stepSpy = sinon.spy(Gallery, "step");
		});

		afterEach(function () {
			intervalStub.restore();
			stepSpy.restore();
		});

		it("initialises the gallery with defaults", function () {
			Gallery.start(galleryElem);
			expect(stepSpy.calledWith(items, 1)).to.be.true;
			expect(intervalStub.calledWith(sinon.match.any, 1000)).to.be.true;
		});

		it("initialises the gallery with custom iterations", function () {
			galleryElem.dataset.iterations = "37";
			Gallery.start(galleryElem);
			expect(stepSpy.calledWith(items, 37)).to.be.true;
		});
		it("initialises the gallery with custom interval", function () {
			galleryElem.dataset.interval = "1.5";
			Gallery.start(galleryElem);
			expect(intervalStub.calledWith(sinon.match.any, 1500)).to.be.true;
		});
		it("creates labels for items that require them", function () {
			var appendChildSpy1 = sinon.spy(itemElem1, "appendChild");
			var appendChildSpy2 = sinon.spy(itemElem2, "appendChild");
			Gallery.start(galleryElem);
			expect(appendChildSpy1.called).to.be.false;
			expect(appendChildSpy2.calledOnce).to.be.true;
			var elem = appendChildSpy2.args[0][0];
			expect(elem.innerHTML).to.equal('ALT');
			appendChildSpy1.restore();
			appendChildSpy2.restore();
		});
	});
	describe('#step', function () {
		var items;
		beforeEach(function () {
			var item1 = {};
			var item2 = {};
			items = [item1, item2];
		});

		it("produces a function", function () {
			var stepFunc = Gallery.step(items, 1);
			expect(stepFunc).to.be.a('function');
		});
		it("correctly sets item classes on initial run", function () {
			/* NOTE: assumption is that the setup funciton has set the first item
			to active, and so on run it'll set the second one to active */
			var stepFunc = Gallery.step(items, 1);
			stepFunc();
			expect(items[0].className).to.equal('inactive');
			expect(items[1].className).to.equal('active');
		});
		it("only iterates once with iteration value of 1", function () {
			var stepFunc = Gallery.step(items, 1);
			stepFunc();
			stepFunc();
			expect(items[0].className).to.equal('inactive');
			expect(items[1].className).to.equal('active');
		});
		it("iterates more than once with iteration value of 0", function () {
			var stepFunc = Gallery.step(items, 0);
			for (var i = 0; i < 100; i++) {
				stepFunc();
				stepFunc();
			}
			expect(items[0].className).to.equal('active');
			expect(items[1].className).to.equal('inactive');
		});
		it("iterates only twice iteration value of 2", function () {
			var stepFunc = Gallery.step(items, 2);
			stepFunc(); // end of iter 1 - [0, 1]
			stepFunc(); // start of iter 2 - [1, 0]
			expect(items[0].className).to.equal('active');
			expect(items[1].className).to.equal('inactive');
			stepFunc(); // end of iter 2 - [0, 1]
			expect(items[0].className).to.equal('inactive');
			expect(items[1].className).to.equal('active');
			stepFunc(); // still end of iter 2 - [0, 1]
			expect(items[0].className).to.equal('inactive');
			expect(items[1].className).to.equal('active');
		});
	});
});
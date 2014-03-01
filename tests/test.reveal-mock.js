Reveal = {
	_eventHandlers: {},
	addEventListener: function (name, handler) {
		this._eventHandlers[name] = handler;
	},
	getCurrentSlide: function () {},
	trigger: function (name) {
		var args = Array.prototype.slice.call(arguments, 1);
		if (this._eventHandlers.hasOwnProperty(name)) {
			this._eventHandlers[name].apply(this, args);
		}
	}
};
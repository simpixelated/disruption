define(function (require) {
	var Marionette = require('marionette'),
		Handlebars = require('handlebars'),
		template = Handlebars.compile(require('text!templates/actions/ipoCurrentSettings.html'));

	return Marionette.ItemView.extend({
		template: template
	});
});
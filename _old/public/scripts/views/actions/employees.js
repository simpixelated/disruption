define(function (require) {
	var Marionette = require('marionette'),
		Handlebars = require('handlebars'),
		template = Handlebars.compile(require('text!templates/actions/employeeCurrentSettings.html'));

	return Marionette.ItemView.extend({
		template: template
	});
});
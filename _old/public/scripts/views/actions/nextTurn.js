define(function (require) {
	var Marionette = require('marionette'),
		Handlebars = require('handlebars'),
		vent = require('vent'),
		template = Handlebars.compile(require('text!templates/actions/nextTurn.html'));

	return Marionette.ItemView.extend({
		template: template,
		events: {
			'click button': 'nextTurn'
		},
		nextTurn: function (e) {
			vent.trigger('nextTurn');
			e.preventDefault();
		}
	});
});
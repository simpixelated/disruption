define(function (require) {
	var _ = require('lodash'),
		Marionette = require('marionette'),
		Handlebars = require('handlebars'),
    	template = Handlebars.compile(require('text!templates/dash/startupStatsSummary.html'));

    return Marionette.ItemView.extend({
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
		},
		template: template
	});

});
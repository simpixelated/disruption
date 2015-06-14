define([
    'lodash',
    'marionette',
    'handlebars',
    'text!templates/core/footer.html'
], function(_, Marionette, Handlebars, template) {

	template = Handlebars.compile(template);

	return Marionette.ItemView.extend({
		template: template,
		serializeData: function () {
			var curDate = new Date();
			return {
				year: curDate.getFullYear(),
				version: 0.4
			};
		}
	});

});
define([
    'jquery',
    'lodash',
    'marionette',
    'handlebars',
    'views/startupActions',
    'text!templates/widgets/modal.html'
], function($, _, Marionette, Handlebars, ActionsView, template) {

	template = Handlebars.compile(template);

	return Marionette.Layout.extend({
		template: template,
		regions: {
			actions: '.actions'
		},
		onRender: function () {
			this.actions.show(new ActionsView({ model: this.model }));
			this.listenTo(this.actions.currentView, 'actionSuccess', function () {
				$('#myModal').foundation('reveal', 'close');
			});
		}
	});

});
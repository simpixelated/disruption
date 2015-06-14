define([
    'marionette',
    'handlebars',
    'views/startupStatsSummary',
    'views/actionsLayout',
    'views/stageProgress',
    'text!templates/dash/dash.html',
    'vent'
], function(Marionette, Handlebars, StartupStatsSummaryView, StartupActionsView, StageProgressView, dashTemplate, vent) {

	dashTemplate = Handlebars.compile(dashTemplate);

	return Marionette.Layout.extend({
		initialize: function() {
			vent.on('message', this.displayMessage, this);
		},
		regions: {
			stats: '.stats',
			actions: '.actions',
			trends: '.trends',
			stage: '.stage-progress'
		},
		ui: {
			events: '.events'
		},
		template: dashTemplate,
		onRender: function () {
			this.stats.show(new StartupStatsSummaryView({ model: this.model }));
			this.actions.show(new StartupActionsView({ model: this.model }));
			this.stage.show(new StageProgressView({ model: this.model }));
		},
		displayMessage: function (message) {
			var cssClass = 'text-info';
			if (typeof message === 'object') {
				cssClass = 'text-' + message.type;
				message = message.text;
			}
			this.ui.events.prepend($('<p>').addClass(cssClass).text(message));
		}
	});

});
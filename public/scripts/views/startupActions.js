define([
    'lodash',
    'marionette',
    'handlebars',
    'vent',
    'text!templates/dash/startupActions.html'
], function(_, Marionette, Handlebars, vent, startupActionsTemplate) {

	startupActionsTemplate = Handlebars.compile(startupActionsTemplate);

	var StartupActionsView = Marionette.ItemView.extend({
		initialize: function () {
			this.collection = this.model.actions;
			this.listenTo(this.collection, 'actionSuccess', function () {
				this.trigger('actionSuccess');
				this.render();
			});
			vent.on('gameover', this.close, this);
		},
		serializeData: function () {
			var visibleActions = this.collection.filter(function (action) {
					return action.isVisible(this.model);
				}, this);

			return {
				items: visibleActions.map(function (model) {
					var data = model.toJSON();
					data.id = model.cid;
					data.limitReached = data.limit === 0;
					return data;
				})
			};
		},
		template: function(data) {
			return startupActionsTemplate(data);
		},
		events: {
			'click .js-action': 'takeAction'
		},
		takeAction: function (e) {
			var id = $(e.currentTarget).attr('data-id'),
				action = this.collection.get(id);

			action.tryAction(this.model);
			e.preventDefault();
		}
	});

	return StartupActionsView;

});
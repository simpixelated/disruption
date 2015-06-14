define([
    'lodash',
    'marionette',
    'handlebars',
    'text!templates/dash/stageProgress.html'
], function(_, Marionette, Handlebars, template) {

	template = Handlebars.compile(template);

	return Marionette.ItemView.extend({
		template: template,
		modelEvents: {
			'change:stage': 'render'
		},
		serializeData: function () {
			var stage = this.model.get('stage'),
				data = {};

			data.stagePercent = (stage === 0) ? 0 : stage / 4 * 100;

			if (stage === 1) {
				data.stage1Status = 'current';
			} else if (stage === 2) {
				data.stage1Status = 'complete';
				data.stage2Status = 'current';
			} else if (stage === 3) {
				data.stage1Status = 'complete';
				data.stage2Status = 'complete';
				data.stage3Status = 'current';
			} else if (stage === 4) {
				data.stage1Status = 'complete';
				data.stage2Status = 'complete';
				data.stage3Status = 'complete';
				data.stage4Status = 'current';
			}
			return data;
		}
	});

});
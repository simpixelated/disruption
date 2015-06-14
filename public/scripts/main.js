var DEBUG = true;
if (!DEBUG) {
	console.log = function () {};
}
(function () {
	var cdn = '//cdnjs.cloudflare.com/ajax/libs/';
	require.config({
		paths: {
			jquery: cdn +'jquery/2.1.1/jquery.min',
			lodash: cdn + 'lodash.js/2.4.1/lodash.min',
			backbone: cdn + 'backbone.js/1.1.2/backbone-min',
			marionette: cdn + 'backbone.marionette/2.0.2/backbone.marionette.min',
			handlebars: cdn + 'handlebars.js/2.0.0-alpha.4/handlebars.min',
			hbars: cdn + 'requirejs-handlebars/0.0.2/hbars',
			text: cdn + 'require-text/2.0.12/text',
			foundation: cdn + 'foundation/5.3.0/js/foundation.min',
			highcharts: cdn + 'highcharts/4.0.3/highcharts',
			templates: '../templates'
		},
		map: {
			'*': {
				underscore: 'lodash'
			},
			'hbars': {
				'Handlebars': 'handlebars'
			}
		},
		shim: {
			marionette: {
				exports: 'Marionette',
				deps: ['backbone']
			},
			lodash: {
				exports: '_'
			},
			handlebars: {
				exports: 'Handlebars'
			},
			foundation: {
				deps: ['jquery'],
	            exports: 'jQuery.fn.foundation'
			},
			highcharts: {
				deps: ['jquery'],
				exports: 'Highcharts'
			}
		}
	});

	require(['exit'],
	function(App){
		App.start();
	});
})();
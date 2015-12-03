// karma.conf.js
module.exports = function (config) {
	config.set({
		frameworks: ['jspm', 'jasmine'],
		browsers: ['PhantomJS2'],
		jspm: {
			loadFiles: [
				'src/**/*.spec.js'
			],
			serveFiles: [
				'src/**/!(*.spec).js'
			]
		},
		files: [
			'node_modules/babel-core/browser-polyfill.js'
		],
		preprocessors: {
			'src/**/!(*.spec).js': ['babel', 'coverage']
		},
		reporters: ['progress', 'coverage'],
		babelPreprocessor: {
			options: {
				presets: ['es2015'],
				sourceMap: 'inline'
			}
		},
		coverageReporter: {
			instrumenters: {
				isparta: require('isparta')
			},
			instrumenter: {
				'src/**/*.js': 'isparta'
			},
			reporters: [
				{ type: 'html', dir: 'coverage/' },
				{ type: 'text-summary' }
			]
		}
	});
};
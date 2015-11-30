// karma.conf.js
module.exports = function(config) {
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
		}
	});
};
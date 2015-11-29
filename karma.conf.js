// karma.conf.js
module.exports = function(config) {
	config.set({
		basePath: './src',
		frameworks: ['jasmine'],
		browsers: ['PhantomJS2'],
		files: [
			'../node_modules/lodash/index.js',
			'**/*.js'
			]
	});
};
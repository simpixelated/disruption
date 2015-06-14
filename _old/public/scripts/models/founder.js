// Founder model
define(function (require) {
	var BB = require('backbone'),
		headQuarters = require('collections/headquarters');

	return BB.Model.extend({
		defaults: {
			location: headQuarters.where({ name: 'Silicon Valley'}),
			development: 0,			// increases lines of code, github stars, hacker news hits
			marketing: 0,			// increases press releases, visitors to your website
			design: 0,				// increases dribble likes, links on Smashing
			network: 0				// actually increases chance of VC
		}
	});
});
// Founder model
define(function (require) {
	var BB = require('backbone'),
		headQuarters = require('collections/headquarters');

	/* TODO: founder types
	======================
		Rockstar Ninja Coder
		* unlocks mobile app dev immediately
		* unlocks access to PHP, Node.js, React, Phonegap, and Ruby on Rails
		{
			development: 1,
			bugginess: 1
		}

		Hype-man
		* unlocks marketing action immediately
		{
			fundingChance: 1
		}

		Connector
		* can pitch investors more often
		* unlocks hiring all types immediately
		{
			recruiting: 1
		}

		Lifestyle Guru
		{
			morale: 1,
			productivity: -1
		}
		* unlocks all office perks immediately
		

		Old School Programmer
		* unlocks regression testing, unit tests, refactor
		* unlocks C++, Java, Python
		{
			bugginess: -1,
			development: 1
		}

		Growth Hacker
		* unlocks all in-app marketing features
		{
			virality: 1
		}

		Serial Entrepreneur
		{
			cash: 50000
		}
		* unlocks all conference actions (SXSW, TED)
		* decreases time/cost of all funding actions (pitch VC, etc.)

		Idea Guy
		* unlocks pivot, integrations, dev features
		* increases chance of sprint injections
	*/

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
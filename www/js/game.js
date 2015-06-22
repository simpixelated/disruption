(function () {

function Game (options) {

	var game = {};

	game._options = _.defaults({
		intervalLength: 1000 * 1,
		year: 1,
		quarter: 1,
		day: 1,
		stopped: true
	}, options);

	_.extend(game, {
		update: function () {
			var response, msg;

			this.simulateDay();
			response = this._options.startup.simulateOnce();

			if (response.capital <= 0) {
				this.stop();
				msg = 'Oh no, your startup went bankrupt! Write your postmortem blog post, then start again. Every failure is a chance to iterate.';
			}

			if (typeof this._options.onTurnComplete === 'function') {
				this._options.onTurnComplete(this._options.startup._attributes, msg);
			}
		},
		run: function () {
			this.update();
		},
		start: function () {
			this._options.intervalId = setInterval(_.bind(this.run, this), game._options.intervalLength);
			this._options.stopped = false;
		},
		stop: function () {
			clearInterval(this._options.intervalId);
			this._options.stopped = true;
		},
		getQuarterFromDay: function (day) {
			return Math.ceil(day/(365/4));
		},
		getYearFromDay: function (day) {
			return Math.ceil(day/365);
		},
		simulateDay: function () {
			var day = this._options.day + 1;

			this._options.day = day;
			this._options.quarter = this.getQuarterFromDay(day);
			this._options.year = this.getYearFromDay(day);
		},
	});

	return game;
	
};

function GameFactory () {
	return {
		getNewGame: function (options) {
			return new Game(options);
		}
	};
}

angular.module('disruption.models.game', [])
	.factory('GameFactory', GameFactory);

})();
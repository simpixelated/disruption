(function () {

function Game (options) {

	var game = {};

	game._options = _.defaults({
		intervalLength: 500 * 1,
		year: 1,
		quarter: 1,
		day: 1
	}, options);

	_.extend(game, {
		update: function () {
			console.log('updating...');
			var response = this._options.startup.simulateOnce();
			this.simulateDay();			
			if (response === 'bankrupt') {
				this.stop();
				console.log(response);
			}
			if (typeof this._options.onTurnComplete === 'function') {
				this._options.onTurnComplete(this._options.startup._attributes);
			}
		},
		run: function () {
			this.update();
		},
		start: function () {
			this._options.intervalId = setInterval(_.bind(this.run, this), game._options.intervalLength);
		},
		stop: function () {
			// To stop the game, use the following:
			console.log('stopping...');
			clearInterval(this._options.intervalId);
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
(function () {

function Game (options) {

	var game = {};

	game._options = _.defaults({
		intervalLength: 1000*10
	}, options);

	_.extend(game, {
		update: function () {
			console.log('updating...');
			console.log(this._options.startup._attributes);
			this._options.startup.simulateOnce();
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
		}
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
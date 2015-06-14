(function () {

function Founder (options) {

	var founder = {};

	founder.skills = _.defaults({
		development: 0,
		marketing: 0,
		design: 0,
		network: 0
	}, options);

	return founder;

}

function FounderFactory () {
	return {
		getNewFounder: function (options) {
			return new Founder(options);
		}
	};
}

angular.module('disruption.models.founder', [])
	.factory('FounderFactory', FounderFactory);

})();
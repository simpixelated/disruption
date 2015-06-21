(function () {

function DashCtrl (FounderFactory, StartupFactory, GameFactory, $rootScope, $scope) {
	var founder = FounderFactory.getNewFounder();
	console.info(founder);

	var startup = StartupFactory.getNewStartup({
		founder: founder
	});
	console.info(startup);

	var game = GameFactory.getNewGame({
		startup: startup,
		onTurnComplete: function (attrs) {
			console.log(attrs);
			$rootScope.$apply();
		}
	});

	console.info(game);
	game.start();

	this.game = game._options;
	this.startup = startup._attributes;

	console.log(this);

	// CHART
	// TODO: move to directive / switch to angularjs-charts/ChartJS
	var chart = angular.element('#statsChart').highcharts({
		chart: {
			type: 'spline'
		},
		plotOptions: {
			series: {
				marker: {
					enabled: false
				}
			}
		},
		series: [{
			name: 'Capital',
			data: [startup.get('capital')]
		}, {
			name: 'Users',
			data: [startup.get('users')]
		}],
		xAxis: {
			title: {
				text: 'Day'
			}
		},
		yAxis: {
			title: {
				text: '$'
			}
		}
	});

	$scope.$watch(function () {
		return startup.get('capital');
	}, function (newValue) {
		chart.highcharts().series[0].addPoint(newValue);
	});
	$scope.$watch(function () {
		return startup.get('users');
	}, function (newValue) {
		chart.highcharts().series[1].addPoint(newValue);
	});
}

angular.module('disruption.controllers', [])
	.controller('DashCtrl', DashCtrl)
	.controller('ChatsCtrl', function($scope, Chats) {
		// With the new view caching in Ionic, Controllers are only called
		// when they are recreated or on app start, instead of every page change.
		// To listen for when this page is active (for example, to refresh data),
		// listen for the $ionicView.enter event:
		//
		//$scope.$on('$ionicView.enter', function(e) {
		//});
		
		$scope.chats = Chats.all();
		$scope.remove = function(chat) {
			Chats.remove(chat);
		}
	})
	.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
		$scope.chat = Chats.get($stateParams.chatId);
	})
	.controller('AccountCtrl', function($scope) {
		$scope.settings = {
			enableFriends: true
		};
	});

})();
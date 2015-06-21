(function () {

function DashCtrl (FounderFactory, StartupFactory, GameFactory, ActionFactory, $rootScope, $scope, $ionicPopup) {
	var founder = FounderFactory.getNewFounder(),
		startup = StartupFactory.getNewStartup({
			founder: founder
		}),
		game = GameFactory.getNewGame({
			startup: startup,
			onTurnComplete: function (attrs, msg) {
				console.log(attrs);
				$rootScope.$apply();
				if (msg) {
					$ionicPopup.alert({
						template: msg
					});
				}
			}
		});

	this.game = game._options;
	this.startup = startup._attributes;

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

	this.actions = ActionFactory.getAllActions();
	this.takeAction = function (action) {
		var response = action.run(startup._attributes);
		game.stop();
		$ionicPopup.alert({
			title: action.name + ' ' + response.message.type,
			template: response.message.text
		}).then(function () {
			startup.set(response.attributes);
			game.start();
		});
	};

	$ionicPopup.alert({
		title: 'Disruption',
		template: 'As a serial entreprenuer, it\`s your goal to create a startup that disrupts the [x] industry like Uber did for taxis. You have $[x] dollars to start. Use them to hire talent, write code, and pitch investors. Keep going until you run out of cash!'
	}).then(function () {
		game.start();
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
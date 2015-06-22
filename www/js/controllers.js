(function () {

function DashCtrl (FounderFactory, StartupFactory, GameFactory, ActionFactory, $rootScope, $scope, $ionicPopup, $ionicModal, _startupStages, _actionTypes) {
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
	this.startupAttr = startup._attributes;

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
		return game._options.day;
	}, function () {
		chart.highcharts().series[0].addPoint(startup._attributes.capital);
		chart.highcharts().series[1].addPoint(startup._attributes.users);
	});

	this.actions = ActionFactory.getAllActions();
	this.onActionComplete = function (response) {
		game.stop();
		$ionicPopup.alert({
			title: response.action.name + ' ' + response.message.type,
			template: response.message.text
		}).then(function () {
			startup.set(response.attributes);
			game.start();
		});
	};

	var modalScope = $rootScope.$new();
	$ionicModal.fromTemplateUrl('templates/initialFunding.html', {
		scope: _.extend(modalScope, {
			actions: _.filter(this.actions, { type: _actionTypes.funding }),
			startup: startup,
			onActionComplete: function (response) {
				modalScope.fundingMessage = response.message;
			}
		})
	}).then(function (modal) {
		modal.show();
		modalScope.modal = modal;
		modalScope.$on('$destroy', function () {
			modal.remove();
		});
		modalScope.$on('modal.hidden', function () {
			startup.set({
				stage: _startupStages[1]
			});
			game.start();
		});
	});
}

// TODO move to directives file (or for modular: disruption.actions)
function actionButton (_actionTypes) {

	function link ($scope) {

		$scope.takeAction = function (action) {
			var response = action.run($scope.startup._attributes);
			$scope.startup.set(response.attributes);
			$scope.onActionComplete({ response: _.extend(response, { action: action }) });
		};

		$scope.getActionClass = function (action) {
			return {
				'button-balanced': action.type === _actionTypes.funding,
				'button-calm': action.type !== _actionTypes.funding,
				'ion-person-add': action.type === _actionTypes.hr,
				'ion-merge': action.type === _actionTypes.dev,
				'ion-social-usd': action.type === _actionTypes.funding
			};
		};
	}

	return {
		restrict: 'E',
		link: link,
		templateUrl: 'templates/actionButton.html',
		scope: {
			startup: '=',
			action: '=',
			onActionComplete: '&'
		}
	};
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
	})
	.directive('actionButton', actionButton);

})();
(function () {

function DashCtrl (FounderFactory, StartupFactory, GameFactory) {
	var founder = FounderFactory.getNewFounder();
	console.log(founder);

	var startup = StartupFactory.getNewStartup({
		founder: founder
	});
	console.log(startup);

	var game = GameFactory.getNewGame({
		startup: startup
	});

	console.log(game);
	game.start();
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
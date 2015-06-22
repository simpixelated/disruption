(function (angular, _) {
'use strict';

function ActionFactory ($filter, _actionTypes, _startupStages) {

	var actions = [];

	actions.push({
		name: 'Kickstarter Campaign',
		type: _actionTypes.funding,
		stage: _startupStages[0],
		isVisible: function (startupAttr) {
			return _.all([
				_.contains(this.stage, startupAttr.stage)
			]);
		},
		run: function (startupAttr) {

			var message = {},
				capital = _.random(1, 5) * 10000,
				users = _.random(0, 10000);

			message.type = 'success';
			message.text = [
				'Your Kickstarter campaign brought in ',
				$filter('currency')(capital, '$', 0),
				' in seed funding, plus ',
				users,
				' new users!']
				.join('');

			return {
				message: message,
				attributes: {
					capital: startupAttr.capital + capital,
					users: startupAttr.users + users
				}
			};
		}
	});

	actions.push({
		name: 'Pitch Angel Investor',
		type: _actionTypes.funding,
		stage: _startupStages[0],
		isVisible: function (startupAttr) {
			return _.all([
				_.contains(this.stage, startupAttr.stage)
			]);
		},
		run: function (startupAttr) {

			var message = {},
				capital = _.random(10, 50) * 10000,
				equity = 5,
				users = _.random(0, 1);

			message.type = 'success';
			message.text = [
				'Someone actually likes your idea enough to give you ',
				$filter('currency')(capital, '$', 0),
				' in seed funding in exchange for ',
				equity,
				'% equity.']
				.join('');

			return {
				message: message,
				attributes: {
					capital: startupAttr.capital + capital,
					equity: startupAttr.equity - equity,
					users: startupAttr.users + users
				}
			};
		}
	});

	actions.push({
		name: 'Join Incubator',
		type: _actionTypes.funding,
		stage: _startupStages[0],
		isVisible: function (startupAttr) {
			return _.all([
				_.contains(this.stage, startupAttr.stage)
			]);
		},
		run: function (startupAttr) {

			var message = {},
				capital = _.random(1, 50) * 10000,
				// TODO: make this more dynamic (based on capital)
				equity = 5,
				users = _.random(0, 100);

			message.type = 'success';
			message.text = [
				'You passed the incubator and have been given ',
				$filter('currency')(capital, '$', 0),
				' in seed funding in exchange for ',
				equity,
				'% equity.']
				.join('');

			return {
				message: message,
				attributes: {
					capital: startupAttr.capital + capital,
					equity: startupAttr.equity - equity,
					users: startupAttr.users + users
				}
			};
		}
	});

	actions.push({
		name: 'Write API',
		type: _actionTypes.dev,
		stage: _startupStages,
		isVisible: function (startupAttr) {
			return _.all([
				_.contains(this.stage, startupAttr.stage)
			]);
		},
		run: function (startupAttr) {
			var message = {},
				morale = 1,
				bugginess = 1;

			message.type = 'success';
			message.text = 'No one will use it, but at least your developers can now add REST API to their resumes.';

			return {
				message: message,
				attributes: {
					morale: startupAttr.morale + morale,
					bugginess: startupAttr.bugginess + bugginess
				}
			};
		}
	});

	actions.push({
		name: 'Hire Developer',
		type: _actionTypes.hr,
		stage: _startupStages,
		isVisible: function (startupAttr) {
			return _.all([
				_.contains(this.stage, startupAttr.stage)
			]);
		},
		run: function (startupAttr) {
			var message = {},
				employees = 1;

			message.type = 'success';
			message.text = [
				'<p>"One machine can do the work of fifty ordinary men. No machine can do the work of one extraordinary man." - Elbert Hubbard</p>',
				'<p>You have hired another developer for ',
				$filter('currency')(startupAttr.averageSalary, '$', 0),
				' per year.</p>'
				]
				.join('');

			return {
				message: message,
				attributes: {
					employees: startupAttr.employees + employees
				}
			};
		}
	});

	return {
		getAllActions: function () {
			return actions;
		}
	};
}

angular.module('disruption.models.actions', [])
	.factory('ActionFactory', ActionFactory);

})(angular, _);
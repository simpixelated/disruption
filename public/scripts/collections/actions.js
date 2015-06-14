define(['lodash', 'backbone', 'models/action', 'vent', 'helpers'],
function(_, Backbone, ActionModel, vent, helpers){

	var marketingFeature = function (options) {
		var visitors = options.startup.get('visitors'),
			newVisitors = _.random(options.min, options.max),
			newUsers = (newVisitors * options.startup.get('conversionRate')),
			message = {};

		options.startup.set('visitors', visitors + newVisitors);
		options.startup.set('users', options.startup.get('users') + newUsers);
		if (newVisitors > 30000) {
			message.type = 'success';
			message.text = 'Your ' + options.feature + ' went viral! ' + Math.round(newVisitors) + ' new visitors';
		} else {
			message.type = 'info';
			message.text = 'Your ' + options.feature + ' brought ' + Math.round(newVisitors) + ' new visitors';
		}
		if (newUsers > 0) {
			message.text += ' and ' + Math.round(newUsers) + ' new users.';
		} else {
			message.text += '.';
		}
		return {
			message: message
		};
	};

	var getFundingOffer = function (startup, equityRange) {
		var equity = startup.get('equity'),
			// check available equity to determine offer range
			maxEquity = (equityRange[0] > equity) ? equityRange[1] - equity : equityRange[0],
			equityOffer = _.random(equityRange[0], maxEquity);
			
		return {
			capital: startup.get('valuation') * equityOffer,
			equity: equityOffer
		};
	};

	var checkEmployee = function (startup, employee) {
		var response = {},
			message = {};

		response.pass = false;
		response.message = message;
		message.type = 'warning';
		message.text = '';

		if (employee.capital && employee.capital > startup.get('capital')) {
			message.text = 'You need at least $' + helpers.formatCurrency(employee.capital) + '.';
		} else if (employee.equity && employee.equity > startup.get('equity')) {
			message.text = 'You need at least ' + helpers.formatPercent(employee.equity) + '% equity.';
		} else {
			response.pass = true;
		}
		return response;
	};

	var completeEmployee = function (startup, employee) {
		var response = {},
			message = {};

		startup.employees.add(employee);
		message.type = 'success';
		message.text = 'Employee #' + startup.employees.length + ' hired! They have ' + helpers.formatPercent(employee.equity) + '% equity.';

		response.message = message;
		return response;
	};

	var actions = [{
		name: 'Kickstarter Campaign',
		isVisible: function (startup) {
			return startup.get('stage') < 1;
		},
		complete: function (startup) {
			var message = {},
				capital = _.random(1, 5) * 10000,
				users = _.random(0, 10000);

			// calculate seed funding
			startup.set('capital', startup.get('capital') + capital);
			startup.set('users', startup.get('users') + users);
			startup.set('stage', 1);
			startup.set('valuation', capital);
			startup.set('vcInterest', startup.get('vcInterest') + 1);

			message.type = 'success';
			message.text = 'Your Kickstarter campaign brought in $' + helpers.formatCurrency(capital) + ' in seed funding, plus ' + users + ' new users!';
			return {
				message: message
			};
		}
	},
	{
		name: 'Join Incubator',
		isVisible: function (startup) {
			return startup.get('stage') < 1;
		},
		complete: function (startup) {
			var message = {},
				capital = _.random(1, 5) * 10000,
				equity = _.random(0.01, 0.5);

			// calculate seed funding
			startup.set('capital', startup.get('capital') + capital);
			startup.set('equity', startup.get('equity') - equity);
			startup.set('stage', 1);
			startup.set('valuation', capital / equity);
			startup.set('vcInterest', startup.get('vcInterest') + 1);

			message.type = 'success';
			message.text = 'Your startup received $' + helpers.formatCurrency(capital) + ' in seed funding for ' + helpers.formatPercent(equity) + '% equity!';
			return {
				message: message
			};
		}
	},
	{
		name: 'Pitch Angel',
		isVisible: function (startup) {
			return startup.get('stage') < 1;
		},
		complete: function (startup) {
			var message = {},
				capital = _.random(8, 20) * 10000,
				equity = _.random(0.05, 0.20);

			// calculate seed funding
			startup.set('capital', startup.get('capital') + capital);
			startup.set('equity', startup.get('equity') - equity);
			startup.set('stage', 1);
			startup.set('valuation', capital / equity);
			startup.set('vcInterest', startup.get('vcInterest') + 1);

			message.type = 'success';
			message.text = 'Your startup received $' + helpers.formatCurrency(capital) + ' in seed funding for ' + helpers.formatPercent(equity) + '% equity!';
			return {
				message: message
			};
		}
	},
	{
		name: 'Go on Shark Tank',
		limit: 1,
		requirements: {
			equity: 0.15
		},
		isVisible: function (startup) {
			return startup.get('stage') > 1 && startup.get('stage') < 3;
		},
		complete: function (startup) {
			var message = {},
				range = [this.get('requirements').equity, 0.30],
				offer = getFundingOffer(startup, range);

			startup.set('capital', startup.get('capital') + offer.capital);
			startup.set('equity', startup.get('equity') - offer.equity);
			startup.set('valuation', startup.get('capital') / offer.equity);
			startup.set('vcInterest', startup.get('vcInterest') + 1);

			message.type = 'success';
			message.text = 'Your startup received $' + helpers.formatCurrency(offer.capital) + ' in seed funding for ' + helpers.formatPercent(offer.equity) + '% equity!';
			return {
				message: message
			};
		}
	},
	{
		name: 'Pitch VC',
		requirements: {
			equity: 0.15
		},
		isVisible: function (startup) {
			return startup.get('stage') > 1 && startup.get('stage') < 3;
		},
		complete: function (startup) {
			var message = {},
				range = [this.get('requirements').equity, 0.30],
				offer = getFundingOffer(startup, range);

			startup.set('capital', startup.get('capital') + offer.capital);
			startup.set('equity', startup.get('equity') - offer.equity);
			// TODO: make sure valuation is updating correctly
			startup.set('valuation', startup.get('capital') / offer.equity);
			startup.set('vcInterest', startup.get('vcInterest') + 1);

			message.type = 'success';
			message.text = 'Your startup received $' + helpers.formatCurrency(offer.capital) + ' in seed funding for ' + helpers.formatPercent(offer.equity) + '% equity!';
			return {
				message: message
			};
		}
	},
	{
		//name: 'Hire Chief Technical Officer',
		name: 'Hire Engineer',
		requirements: {
			capital: 70000,
			equity: 0.05
		},
		visible: {
			stage: 1
		},
		//limit: 1,
		checkRequirements: function (startup) {
			return checkEmployee(startup, _.clone(this.get('requirements')));
		},
		complete: function (startup) {
			var employee = _.clone(this.get('requirements'));
			employee.type = 'developer';
			return completeEmployee(startup, employee);
		}
	},
	{
		//name: 'Hire Chief Marketing Officer',
		name: 'Hire Marketer',
		requirements: {
			capital: 70000,
			equity: 0.05
		},
		visible: {
			stage: 1
		},
		//limit: 1,
		checkRequirements: function (startup) {
			return checkEmployee(startup, _.clone(this.get('requirements')));
		},
		complete: function (startup) {
			var employee = _.clone(this.get('requirements'));
			employee.type = 'marketer';
			return completeEmployee(startup, employee);
		}
	},
	{
		name: 'Develop New Feature',
		visible: {
			stage: 1
		},
		checkRequirements: function (startup) {
			var response = {},
				message = {};

			response.pass = false;
			response.message = message;
			message.type = 'warning';
			message.text = '';

			if (startup.getEmployeesByType('developer').length < 1) {
				message.text = 'You need at least 1 engineer to do that.';
			} else {
				response.pass = true;
			}
			return response;
		},
		complete: function (startup) {
			var dieRoll = _.random(1, 10),
				users = startup.get('users'),
				newUsers = users * startup.get('conversionRate'),
				lostUsers,
				message = {};

			if (newUsers < 10) {
				newUsers = 10;
			}

			if (dieRoll > 3) {
				startup.set('users', users + newUsers);
				message.type = 'success';
				message.text = 'Your new features attracted ' + Math.round(newUsers) + ' new users!';
			} else {
				lostUsers = newUsers;
				startup.set('users', users - lostUsers);
				message.type = 'danger';
				message.text = 'You released a new bug and lost ' + Math.round(lostUsers) + ' users!';
			}

			return {
				message: message
			};
		}
	},
	{
		name: 'Present at SXSW',
		requirements: {
			capital: 1000
		},
		visible: {
			stage: 1
		},
		limit: 1,
		complete: function (startup) {
			var dieRoll = _.random(1, 10),
				valuation = startup.get('valuation'),
				message = {},
				newValuation,
				newUsers;

			startup.set('capital', startup.get('capital') - this.get('requirements').capital);
			if (dieRoll > 5) {
				newUsers = dieRoll * 1000;
				newValuation = valuation * 0.1;
				startup.set('users', startup.get('users') + newUsers);
				startup.set('valuation', valuation + newValuation);
				message.type = 'success';
				message.text = 'You presentation went viral! You have ' + helpers.formatWholeNumber(newUsers) + ' new users!';
			} else {
				message.type = 'info';
				message.text = 'Your presentation flopped. That\'s okay, everyone was too hungover to notice.';
			}
			return {
				message: message
			};
		}
	},
	{
		name: 'Write press release',
		visible: {
			stage: 1
		},
		checkRequirements: function (startup) {
			var response = {},
				message = {};

			response.pass = false;
			response.message = message;
			message.type = 'warning';
			message.text = '';

			if (startup.getEmployeesByType('marketer').length < 1) {
				message.text = 'You need at least 1 marketer to do that.';
			} else {
				response.pass = true;
			}
			return response;
		},
		complete: function (startup) {
			return _.bind(marketingFeature, this)({ feature: 'press release', startup: startup, min: 100, max: 10000 });
		}
	},
	{
		name: 'start charging customers',
		limit: 1,
		complete: function (startup) {
			var users = startup.get('users'),
				attritionRate = startup.get('attritionRate'),
				lostUsers = users - (users * attritionRate),
				newCapital;

			startup.set('revenuePerUser', 10);
			startup.set('attritionRate', attritionRate + 0.1);
			startup.set('users', lostUsers);

			newCapital = startup.get('users') * startup.get('revenuePerUser');
			startup.set('capital', startup.get('capital') + newCapital);

			this.trigger('message', { type: 'info', text: lostUsers + ' users quit, but you earned $' + Math.round(newCapital) + ' from the ones that stayed.' });
			this.trigger('actionSuccess');
		}
	},
	{
		name: 'setup customer support',
		limit: 1,
		complete: function (startup) {
			var revenuePerUser = startup.get('revenuePerUser'),
				referralRate = startup.get('referralRate'),
				attritionRate = startup.get('attritionRate'),
				newExpenses,
				supportCost,
				text;

			// customer support costs 25% of customer revenue, or just $1/user
			supportCost = (revenuePerUser > 0) ? revenuePerUser * 0.25 : 1;
			newExpenses = startup.get('users') * supportCost;
			startup.set('expensesPerUser', startup.get('expensesPerUser') + supportCost);
			startup.set('expenses', startup.get('expenses') + newExpenses);
			if (referralRate <= 0.9) {
				startup.set('referralRate', referralRate + 0.1);
			}
			if (attritionRate > 0.05) {
				startup.set('attritionRate', attritionRate - 0.05);
			}

			console.log(startup);
			text = 'Your users are more likely stay, but it\'s going to cost $' + helpers.formatCurrency(newExpenses) + ' per month.';
			this.trigger('message', { type: 'info', text: text });
			this.trigger('actionSuccess');
		}
	},
	/*{
		name: 'present to investors',
		checkRequirements: {
			stage: 2
		},
		complete: function (startup) {
			var kValue = startup.get('k-value'),
				burnRate = startup.get('expenses'),
				capital = startup.get('capital'),
				stage = startup.get('stage'),
				users = startup.get('users'),
				equity = startup.get('equity'),
				soldEquity,
				random = _.random(1, 10),
				text,
				investment = calculateInvestment(startup);

			if (equity < 0.01) {
				this.trigger('message', { type: 'warning', text: 'Not enough equity. Try buying out an employee.' });
				return false;
			}

			if (stage === 1 || users < 1000) {
				this.trigger('message', { type: 'warning', text: 'Investors are ignoring your emails.'});
				return false;
			}

			if (_.contains([2,3,4], stage)) {
				// bonuses/penalties to chance to succeed
				if (kValue > 1.2 || users > 100000) { random += 4; }
				if (random > 5 && investment) {
					startup.set('capital', capital + investment.capital);
					startup.set('equity', equity - investment.equity);
					text = 'Your startup received $' + helpers.formatCurrency(investment.capital) + ' in funding for ' + helpers.formatPercent(investment.equity) + '% in equity!';
					this.trigger('message', { type: 'success', text: text });
					this.trigger('actionSuccess');
				} else {
					text = 'Unfortunately no investors understand your vision.';
					this.trigger('message', { type: 'warning', text: text });
				}
			}
		}
	}*/];

	return Backbone.Collection.extend({
		model: ActionModel,
		initialize: function () {
			this.add(actions);
			this.forEach(function (model) {
				model.on('message', function (message) {
					vent.trigger('message', message);
				});

				model.on('actionSuccess', function (model) {
					this.trigger('actionSuccess');
				}, this);
			}, this);
		}
	});

});
(function () {

function Startup (options) {

	var startup = {};

	startup.founder = options.founder;

	startup._attributes = {
		employees: 1,
		averageSalary: 70000,
		rent: 0,
		revenuePerUser: 0,
		costPerUser: 0.01,
		users: 1,
		capital: 1000000,
		
		// TODO: incorporate these stats into simulation
		// development: 1,
		bugginess: 0,
		morale: 0,
		// virality: 0,

		// TODO: move market into "Market" model
		// from: http://www.internetworldstats.com/stats.htm
		marketSizeGlobal: 2802478934,
		marketSizeLocal: 5000000,//300287577,
		competitors: 0,
		competitorUsers: 0,
		marketShare: 0
	};

	startup.get = function (attr) {
		return startup._attributes[attr];
	};

	startup.set = function (key, val) {
		if (!key) { return this; }

		// Handle both `"key", value` and `{key: value}` -style arguments.
		// shamelessly stolen from Backbone.js
		// https://github.com/jashkenas/backbone/blob/master/backbone.js
		var attrs;
		if (typeof key === 'object') {
			attrs = key;
		} else {
			(attrs = {})[key] = val;
		}

		_.extend(startup._attributes, attrs);
	};

	_.extend(startup, {
		history: [],
		simulateOnce: function () {
			if (this.get('capital') < 0) {
                return 'Oh no, your startup went bankrupt! Write your postmortem blog post, then start again. Every failure is a chance to iterate.';
            } else {
            	this.simulateUsers();
				this.simulateCapital();
				this.history.push(_.clone(this._attributes));
				return this._attributes;
            }
		},
		simulateUsers: function () {
			var curUsers = this.get('users'),
				newUsers = Math.ceil(curUsers*_.random(0.0,0.2)),
				competitors = this.getCompetitors(),
				market = this.get('marketSizeLocal') - competitors.competitorUsers,
				users = curUsers+newUsers;

			if (users >= market) {
				users = curUsers - newUsers;
				console.log('market saturation!');
			}

			this.set('users', users);
			this.set(competitors);
			this.set('marketShare', this.getMarketShare(users, competitors.competitorUsers));
		},
		simulateCapital: function () {
			var costs = this.getOperatingCosts(),
				revenue = this.getRevenue();

			this.set('capital', this.get('capital') - costs + revenue);
		},
		getMarketShare: function(users, competitorUsers) {
			return users/(users+competitorUsers);
		},
		getCompetitors: function () {
			var totalUserMarket = this.get('marketSizeLocal'),
				curUsers = this.get('users'),
				competitors = this.get('competitors'),
				competitorUsers = this.get('competitorUsers');

			// add a competitor for every 10k users
			if (curUsers/(Math.max(1, competitors)*10000) > 1) {
				competitors += 1;
			}

			competitorUsers = curUsers/10*competitors;
			return {
				competitors: competitors,
				competitorUsers: competitorUsers
			};
		},
		getOperatingCosts: function () {
			var costs = [0];

			costs.push(this.get('employees') * (this.get('averageSalary')/365));
			costs.push(this.get('rent'));
			costs.push(this.get('users')*this.get('costPerUser'));
			//costs.push(this.get('perks'));
			//costs.push(this.get('legal'));

			return _.reduce(costs, function (sum, num) {
				return sum + num;
			});
		},
		getRevenue: function () {
			return this.get('users') * this.get('revenuePerUser');
		}
	});

	return startup;
}

function StartupFactory () {
	return {
		getNewStartup: function (options) {
			return new Startup(options);
		}
	};
}

angular.module('disruption.models.startup', [])
	.factory('StartupFactory', StartupFactory);

})();
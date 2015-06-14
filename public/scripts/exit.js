define(function (require) {
	var BB = require('backbone'),
		headQuarters = require('collections/headquarters'),
		Founder = require('models/founder'),
		ChartView = require('views/chart'),
		Startup = require('models/startup'),
		_template = require('hbars!templates/startup'),
		helpers = require('helpers');

	var StatsView = BB.View.extend({
		template: require('hbars!templates/stats'),
		initialize: function () {
			this.listenTo(this.model, 'change', function () {
				this.render();
			});
		},
		render: function () {
			this.$el.html(this.template(this.model.attributes));
			return this;
		}
	});

	var StartupView = BB.View.extend({
		events: {
			'click .button': 'retry'
		},
		template: _template,
		initialize: function () {
			this.listenTo(this.model, 'change:status', this.render);
		},
		render: function () {
			var chart = new ChartView({
				model: this.model
			});
			var stats = new StatsView({
				model: this.model
			});

			this.$el.html(this.template(this.model.attributes));
			this.$('.chart').html(chart.render().el);
			this.$('.stats').html(stats.render().el);
			chart.renderChart();
			return this;
		},
		retry: function () {
			//this.model.simulate();
			//console.log(this.model.attributes);
		}
	});

	return {
		start: function () {
			var view,
				founder,
				startup;

			// have 4 points to put into skills
			founder = new Founder({
				location: headQuarters.findWhere({ name: 'Silicon Valley'}),
				development: 1,
				design: 1,
				marketing: 1,
				network: 1
			});
			
			startup = new Startup({
				founder: founder,
				runs: 0
			});

			view = new StartupView({
				model: startup
			});

			var Game = BB.Model.extend({
				defaults: {
					intervalLength: 1000*10
				},
				update: function () {
					console.log('updating...');
					this.get('startup').simulateOnce();
				},
				run: function () {
					this.update();
				},
				start: function () {
					this.set('intervalId', setInterval(_.bind(this.run, this), this.get('intervalLength')));
				},
				stop: function () {
					// To stop the game, use the following:
					console.log('stopping...');
					clearInterval(this.get('intervalId'));
				}
			});

			Handlebars.registerHelper('formatCurrency', helpers.formatCurrency);
    		Handlebars.registerHelper('formatPercent', helpers.formatPercent);
    		Handlebars.registerHelper('formatWholeNumber', helpers.formatWholeNumber);

			$(function() {
				$('.main').html(view.render().el);
				//startup.simulate();
				var game = new Game({
					startup: startup
				});
				game.start();
			});
			
		}
	};
});
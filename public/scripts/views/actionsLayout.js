define(function (require) {
    var Marionette = require('marionette'),
        Handlebars = require('handlebars'),
        EmployeesActionView = require('views/actions/employees'),
	    CompensationActionView = require('views/actions/compensation'),
	    InvestorsActionView = require('views/actions/investment'),
	    IpoActionView = require('views/actions/ipo'),
	    NextTurnView = require('views/actions/nextTurn'),
	    template = Handlebars.compile(require('text!templates/actions/actionsLayout.html')),
	    vent = require('vent');

	return Marionette.Layout.extend({
		template: template,
		regions: {
			employees: '.employees',
			compensation: '.compensation',
			investors: '.investors',
			ipo: '.ipo',
			nextTurn: '.next'
		},
		onRender: function () {
			this.employees.show(new EmployeesActionView({ model: this.model }));
			this.compensation.show(new CompensationActionView({ model: this.model }));
			this.investors.show(new InvestorsActionView({ model: this.model }));
			this.ipo.show(new IpoActionView({ model: this.model }));
			this.nextTurn.show(new NextTurnView({ model: this.model }));
		}
	});
});
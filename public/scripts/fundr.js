/* global define */
require.config({
    paths: {
        jquery: '//code.jquery.com/jquery-2.0.3.min',
        lodash: '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min',
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min',
        marionette: '//cdnjs.cloudflare.com/ajax/libs/backbone.marionette/1.4.0-bundled/backbone.marionette.min',
        handlebars: '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.1.2/handlebars.min',
        foundation: '//cdnjs.cloudflare.com/ajax/libs/foundation/5.2.2/js/foundation.min',
        templates: '../templates'
    },
    shim: {
        backbone: {
            exports: 'Backbone',
            deps: ['lodash', 'jquery']
        },
        marionette: {
            exports: 'Marionette',
            deps: ['backbone']
        },
        lodash: {
            exports: '_'
        },
        handlebars: {
            exports: 'Handlebars'
        },
        foundation: {
            deps: ['jquery'],
            exports: 'jQuery.fn.foundation'
        }
    }
});

require(['lodash', 'backbone'],
function (_, Backbone) {
    'use strict';

    // choose location, funding type, maybe employee ratio
    // click GO and see your results (bankrupt, exit, IPO, etc.)

    var City = Backbone.Model.extend({
        defaults: {
            name: '',
            salary: 85000,
            accelerators: 0,
            vc: 0
        }
    });
    
    var Cities = Backbone.Collection.extend({
        model: City
    });

    var cities = new Cities([{
            name: 'Silicon Valley',
            // http://www.glassdoor.com/Salaries/san-francisco-software-engineer-salary-SRCH_IL.0,13_IM759_KO14,31.htm
            salary: 100000,
            // http://www.seed-db.com/accelerators
            accelerators: 20,
            // http://en.wikipedia.org/wiki/List_of_venture_capital_firms
            vc: 68
        },
        {
            name: 'New York',
            salary: 75000,
            accelerators: 19,
            vc: 22
        }
    ]);

    var funding = new Backbone.Collection([{
        name: 'Accelerator',
        min: 5000,
        max: 10000000
    },
    {
        name: 'Kickstarter',
        min: 5000,
        max: 1000000
    }]);

    var _findModelInCollectionByAttribute = function (collection, attr, value) {
        return _.find(collection, function (model) {
            return model.get(attr) === value;
        });
    };

    /*
        var example = new Startup({
            hq: 'Silicon Valley',
            funding: 'Accelerator',
            market: 'Analytics'
        });
        example.simulate();
    */
    var Startup = Backbone.Model.extend({
        simulate: function () {
            this.completeFundingRound(this.get('funding'));
            // simulate hiring employees and paying salary
            // update valuation
        },
        completeFundingRound: function (funding) {
            // use funding type to figure out capital
            this.set('capital', this.get('capital') + _.random(funding.get('min'), funding.get('max')));
        },
        defaults: {
            hq: _findModelInCollectionByAttribute(cities.models, 'name', 'Silicon Valley'),
            funding: _findModelInCollectionByAttribute(funding.models, 'name', 'Accelerator'),
            market: 'Social Media',

            // new sim values
            operatingCosts: 0,
            pricePerUser: 0,
            users: 0,
            income: 0,
            capital: 100000,
            salary: 1,
            stockGrant: 0,
            optionsGrant: 0,
            profitSharing: 0,
            headcountGrowth: 0,
            engineerRatio: 1,
            vcFundsRequested: 0,
            vcFundsStatus: null,
            ipoShare: 0,
            ipoStatus: null,
            employees: [0, 0],
            morale: 1,
            quarter: 1,
            year: 1,
            stage: 0,
            equity: 1,
            valuation: 0,
            vcInterest: 0
        }
    });

    var startup = new Startup();
    startup.simulate();
    console.log(startup);
});
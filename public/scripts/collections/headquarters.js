// HeadQuarters collection (cities / locations for founders and startups)
define(function (require) {
	var BB = require('backbone');

	var HeadQuarter = BB.Model.extend({
		defaults: {
            name: '',
            salary: 85000,
            accelerators: 0,
            vc: 0
        }
    });

    var HeadQuarters = BB.Collection.extend({
    	model: HeadQuarter
    });

	return new HeadQuarters([{
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
});
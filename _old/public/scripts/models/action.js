define(['lodash', 'backbone'],
function (_, Backbone) {
	var Action = Backbone.Model.extend({
		initialize: function () {
            var checkRequirements = this.get('checkRequirements'),
                isVisible = this.get('isVisible');

            if (typeof checkRequirements === 'function') {
                this.checkRequirements = _.bind(checkRequirements, this);
            }

            if (typeof isVisible === 'function') {
                this.isVisible = _.bind(isVisible, this);
            }

            this.tryAction = _.bind(this.tryAction, this);
            this.complete = _.bind(this.get('complete'), this);
        },
        isVisible: function (startup) {
            var visible = this.get('visible');

            if (!visible) {
                return false;
            }

            return _.every(visible, function (min, requirement) {
                return startup.has(requirement) && startup.get(requirement) >= min;
            });
        },
        // default function to check requirements object
        checkRequirements: function (startup) {
            var requirements = _.clone(this.get('requirements')),
                response = {};

            response.pass = _.every(requirements, function (min, requirement) {
                return startup.has(requirement) && startup.get(requirement) >= min;
            });

            return response;
        },
        tryAction: function (startup) {
            var response = this.checkRequirements(startup);

            if (!response.pass) {

                if (response.message && response.message.text) {
                    this.trigger('message', response.message);
                }
                console.log('did not pass requirements');
                return false;

            } else {

                response = this.complete(startup);
                if (response.message && response.message.text) {
                    this.trigger('message', response.message);
                }
                
                // reduce limit
                if (this.has('limit')) {
                    this.set('limit', this.get('limit') - 1);
                }

                // random negative action
                if (startup.employees && (startup.employees.length > 1 && _.random(1, 100) < 10)) {
                    this.poachEmployee(startup);
                }

                this.trigger('actionSuccess');
                return true;

            }
        },
        poachEmployee: function (startup) {
            var total = startup.employees.length,
                poached = startup.employees.at(_.random(0, total - 1));

            startup.employees.remove(poached);
            this.trigger('message', { type: 'danger', text: 'Your ' + poached.get('type') + ' was poached!' });
        }
    });

    return Action;
});
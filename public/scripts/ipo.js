/* Author: Jordan Kohl

*/
define(['jquery', 'backbone', 'handlebars', 'helpers', 'models/startup', 'views/dashboard', 'views/footer', 'collections/actions', 'foundation', 'views/modal'],
function($, Backbone, Handlebars, helpers, Startup, DashboardView, FooterView, Actions, Foundation, ModalView) {
    'use strict';
    var App = {};

    Handlebars.registerHelper('formatCurrency', helpers.formatCurrency);
    Handlebars.registerHelper('formatPercent', helpers.formatPercent);

    App.start = function () {
        var startup = new Startup(),
			view = new DashboardView({ model: startup }),
			footer = new FooterView();

		startup.actions = new Actions();

        $('.dash').html(view.render().el);
        $('footer').html(footer.render().el);

        var modal = new ModalView({ model: startup });

        // show seed funding modal
        $('body').append(modal.render().el);
        //$('#myModal').foundation('reveal', 'open');

        $(document).foundation();
    };
    return App;
});
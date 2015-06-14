define(['backbone', 'models/startup'],
function(Backbone, Startup){

	var Startups = Backbone.Collection.extend({
        url: 'api/startups',
        model: Startup
    });

    return Startups;

});
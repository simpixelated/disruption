define(function (require) {
    var BB = require('backbone'),
        Highcharts = require('highcharts');

    return BB.View.extend({
        initialize: function () {
            this.listenTo(this.model, 'change:capital', function (model, value) {
                this.$el.highcharts().series[0].addPoint(value);
            });
            this.listenTo(this.model, 'change:users', function (model, value) {
                this.$el.highcharts().series[1].addPoint(value);
            });
        },
        renderChart: function () {
            this.$el.highcharts({
                chart: {
                    type: 'spline'
                },
                plotOptions: {
                    series: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                series: [{
                    name: 'Capital',
                    data: [this.model.get('capital')]
                }, {
                    name: 'Users',
                    data: [this.model.get('users')]
                }],
                xAxis: {
                    title: {
                        text: 'Day'
                    }
                },
                yAxis: {
                    title: {
                        text: '$'
                    }
                }
            });
        },
        render: function () {  
            return this;
        }
    });
});
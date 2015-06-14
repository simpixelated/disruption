define(['lodash'],
function(_){
	
	return {
		formatCurrency: function(value) {
			var number = Math.round(parseInt(value, 10));
			return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
		},
		formatPercent: function (value) {
			return Math.floor(parseFloat(value, 10) * 100);
		},
		formatWholeNumber: function (value) {
			var number = Math.round(parseInt(value, 10));
			return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
		}
	};
});
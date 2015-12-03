// TODO: switch to real Immutable

import _ from 'lodash/index';

let Immutable = {
	fromJS: function (obj) {
		return _.extend({}, obj, {
			get: function (attr) {
				return this.attrs[attr];
			},
			set: function (attr, val) {
				this.attrs[attr] = val;
				return this.attrs[attr];
			}
		});
	}
};

export default Immutable;
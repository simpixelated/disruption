'use strict';

import Immutable from './utils/Immutable';
import _ from 'lodash/index';

const FUNDING_ROUNDS = ['Bootstrap', 'Seed', 'A', 'B', 'C', 'D'];

// TODO: move to separate file
let Funding = function (options) {

	let funding = {};

	funding.attrs = Immutable.fromJS(_.extend({
		amount: 0,
		round: FUNDING_ROUNDS[1]
	}, options));
	funding.get = funding.attrs.get;
	funding.set = funding.attrs.set;
	return funding;
};

export { FUNDING_ROUNDS, Funding };
export default Funding;
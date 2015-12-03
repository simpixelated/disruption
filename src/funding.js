import Immutable from './utils/Immutable';
import _ from 'lodash';

const FUNDING_ROUNDS = ['Bootstrap', 'Seed', 'A', 'B', 'C', 'D'];

class Funding {
	constructor (options) {
		this.attrs = Immutable.fromJS(_.extend({
			amount: 0,
			round: FUNDING_ROUNDS[1]
		}, options));

		this.get = this.attrs.get;
		this.set = this.attrs.set;
	}
}

export { FUNDING_ROUNDS, Funding };
export default Funding;

import Immutable from './utils/Immutable';
import _ from 'lodash';

class Asset {
	constructor (options) {
		this.attrs = Immutable.fromJS(_.extend({
			purchaseCost: 1000,
			perTurnCost: 30,
			valuationPerTurn: 30*4
		}, options));
		this.get = this.attrs.get;
		this.set = this.attrs.set;
	}
}

let assets = [
	// TODO: create assets
];

export { Asset, assets };
export default Asset;

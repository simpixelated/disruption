'use strict';

import Immutable from './utils/Immutable';
import _ from 'lodash/index';

/*
example asset:
TODO: move to own file
*/
let Asset = function (options) {
	let asset = {};
	
	asset.attrs = Immutable.fromJS({
		purchaseCost: 1000,
		perTurnCost: 30,
		valuationPerTurn: 30*4
	});
	asset.get = asset.attrs.get;
	asset.set = asset.attrs.set;
	return asset;
}

let assets = [
	// TODO: create assets
];

export { Asset, assets };
export default Asset;
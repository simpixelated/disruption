'use strict';

import Immutable from './utils/Immutable';
import { FUNDING_ROUNDS } from './funding';
import _ from 'lodash/index';

let Startup = function (options) {

	let startup = {};

	startup.attrs = Immutable.fromJS(_.extend({
		funding: 0,
		assets: [],
		currentTurn: 1
	}, options));
	startup.get = startup.attrs.get;
	startup.set = startup.attrs.set;

	startup.setValuation = function (funding) {
		this.set('valuation', funding * 4);
	};

	startup.purchaseAsset = function (asset) {
		this.addAsset(asset);
		this.decreaseFunding(asset.get('purchaseCost'));
	};

	startup.addAsset = function (asset) {
		this.set('assets', this.get('assets').push(asset));
	};

	startup.addFunding = function (funding) {
		this.increaseFunding(funding.get('amount'));
		if (funding.get('type') !== 'bridge') {
			this.increaseValuation(funding.get('amount') * 4);
			this.increaseRound(funding.get('round'));
		}
	};

	startup.increaseRound = function (round) {
		let fundingRoundIndex = FUNDING_ROUNDS.indexOf(round);
		let nextRound;

		if (fundingRoundIndex === FUNDING_ROUNDS.length) {
			nextRound = FUNDING_ROUNDS[fundingRoundIndex];
		} else if (fundingRoundIndex !== -1) {
			nextRound = FUNDING_ROUNDS[fundingRoundIndex + 1];
		} else {
			nextRound = this.get('round');
		}

		this.set('round', nextRound);
	}

	startup.increaseFunding = function (amount) {
		this.set('funding', this.get('funding') + amount);
	};

	startup.decreaseFunding = function (amount) {
		this.set('funding', this.get('funding') - amount);
	};

	startup.increaseValuation = function (amount) {
		this.set('valuation', this.get('valuation') + amount);
	};

	startup.manageAsset = function (assetId) {
		let asset = this.getAssetById(id);
		// TODO: emit error if not found
		if (asset) {
			this.increaseValuation(asset.get('valuationPerTurn'));
		}
	};

	startup.getAssetById = function (id) {
		return _.find(this.get('assets'), function (asset) {
			return asset.get('id') === assetId;
		});
	};

	startup.nextTurn = function () {
		this.get('assets').forEach(function (asset) {
			this.startup.decreaseFunding(asset.get('perTurnCost'));
		});
		this.increaseTurn(1);
	}

	startup.increaseTurn = function (num) {
		this.set('currentTurn', this.get('currentTurn') + num);
	}

	if (!startup.get('valuation')) {
		startup.setValuation(startup.get('funding'));
	}

	return startup;
};

export default Startup;
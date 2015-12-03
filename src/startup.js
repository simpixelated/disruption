import Immutable from './utils/Immutable';
import { FUNDING_ROUNDS } from './funding';
import _ from 'lodash';

class Startup {

	constructor (options) {

		this.attrs = Immutable.fromJS(_.extend({
			funding: 0,
			assets: [],
			currentTurn: 1
		}, options));

		this.get = this.attrs.get;
		this.set = this.attrs.set;

		if (!this.get('valuation')) {
			this.setValuation(this.get('funding'));
		}
	}

	setValuation (funding=0) {
		this.set('valuation', funding * 4);
	}

	purchaseAsset (asset) {
		this.addAsset(asset);
		this.decreaseFunding(asset.get('purchaseCost'));
	}

	addAsset (asset) {
		this.set('assets', this.get('assets').push(asset));
	}

	addFunding (funding) {
		this.increaseFunding(funding.get('amount'));
		if (funding.get('type') !== 'bridge') {
			this.increaseValuation(funding.get('amount') * 4);
			this.increaseRound(funding.get('round'));
		}
	}

	increaseRound (round) {
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

	increaseFunding (amount=0) {
		this.set('funding', this.get('funding') + amount);
	}

	decreaseFunding (amount=0) {
		this.set('funding', this.get('funding') - amount);
	}

	increaseValuation (amount=0) {
		this.set('valuation', this.get('valuation') + amount);
	}

	manageAsset (assetId) {
		let asset = this.getAssetById(assetId);
		// TODO: emit error if not found
		if (asset) {
			this.increaseValuation(asset.get('valuationPerTurn'));
		}
	}

	getAssetById (id) {
		return _.find(this.get('assets'), (asset) => asset.get('id') === id);
	}

	nextTurn () {
		this.get('assets').forEach((asset) => this.decreaseFunding(asset.get('perTurnCost')));
		this.increaseTurn(1);
	}

	increaseTurn (num) {
		this.set('currentTurn', this.get('currentTurn') + num);
	}

}

export default Startup;

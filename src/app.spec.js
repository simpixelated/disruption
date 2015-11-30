'use strict';

import Startup from './startup';
import { Funding, FUNDING_ROUNDS } from './funding';
import { Asset, assets } from './asset';

describe('startup init', function () {

	it('new startup has reasonable defaults', function () {
		var startup = new Startup();
		expect(typeof startup.get('funding')).toEqual('number');
		expect(typeof startup.get('valuation')).toEqual('number');
		expect(startup.get('assets')).toEqual([]);
	});

	it('new startup accepts options that overwrite defaults', function () {
		var expectedFunding = 7897;
		var expectedValuation = 41355;
		var startup = new Startup({
			funding: expectedFunding,
			valuation: expectedValuation
		});
		expect(startup.get('funding')).toEqual(expectedFunding);
		expect(startup.get('valuation')).toEqual(expectedValuation);
	});

	it('if not set, valuation will be set to a reasonable default', function () {
		var initialFunding = 1000;
		var startup = new Startup({
			funding: initialFunding
		});
		expect(startup.get('valuation')).toEqual(initialFunding * 4);
	});

	it('keeps track of turns', function () {
		var startup = new Startup();
		var expectedTurn = startup.get('currentTurn');
		startup.nextTurn();
		expect(startup.get('currentTurn')).toEqual(expectedTurn + 1);
	});

	// TODO: test for simulating n+1 turns

});

describe('assets', function () {

	it('asset purchases will decrease funding each turn', function () {
		assets.forEach(function (asset) {
			// create a new game and startup to avoid
			// other assets changing the total per turn cost
			// TODO: test with multiple assets on each turn
			var startup = new Startup();
			var expectedFunding;

			startup.purchaseAsset(asset);
			expectedFunding = startup.get('funding') - asset.get('perTurnCost');
			startup.nextTurn();
			expect(startup.get('funding')).toEqual(expectedFunding);
		});
	});

	it('asset purchases with initial costs will decrease funding immediately', function () {
		var startup = new Startup();

		assets.forEach(function (asset) {
			var expectedFunding = startup.get('funding') - asset.get('purchaseCost');
			startup.purchaseAsset(asset);
			expect(startup.get('funding')).toEqual(expectedFunding);
		});
	});

	it('asset purchases will increase valuation when managed', function () {
		var startup = new Startup({
			assets: assets,
			funding: 1000000
		});

		startup.get('assets').forEach(function (asset) {
			var expectedValuation = start.get('valuation') + asset.get('valuationPerTurn');
			startup.manageAsset(asset.get('id'));
			expect(startup.get('valuation')).toEqual(expectedValuation);
		});

	});

});

describe('funding', function () {

	var startup;
	beforeEach(function () {
		startup = new Startup();
	});

	it('bridge funding increases funding without affecting valuation', function () {
		var bridge = new Funding({
			type: 'bridge',
			amount: 10
		});
		var expectedFunding = startup.get('funding') + 10;
		var expectedValuation = startup.get('valuation');

		startup.addFunding(bridge);
		expect(startup.get('funding')).toEqual(expectedFunding);
		expect(startup.get('valuation')).toEqual(expectedValuation);
	});

	it('series funding increases startup round', function () {
		startup.set('round', 0);

		FUNDING_ROUNDS.forEach(function (round, index, rounds) {
			var funding = new Funding({
				round: round,
				amount: 10
			});
			var expectedRound;
			if (index < FUNDING_ROUNDS.length) {
				expectedRound = FUNDING_ROUNDS[index + 1];
			} else {
				expectedRound = FUNDING_ROUNDS[index];
			}

			startup.addFunding(funding);
			expect(startup.get('round')).toEqual(expectedRound)
		});
	});

});
// import Startup
// import assets
// import Game
// import Funding

// TOOD: swithc to Immutable
var Immutable = {
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

var FUNDING_ROUNDS = ['Bootstrap', 'Seed', 'A', 'B', 'C', 'D'];

/*
example startup:
*/
// TODO: move to own file
var Startup = function (options) {

	var startup = {};

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
		var fundingRoundIndex = FUNDING_ROUNDS.indexOf(round);
		var nextRound;

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
		var asset = this.getAssetById(id);
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

// TODO: move to separate file
var Funding = function (options) {

	var funding = {};

	funding.attrs = Immutable.fromJS(_.extend({
		amount: 0,
		round: FUNDING_ROUNDS[1]
	}, options));
	funding.get = funding.attrs.get;
	funding.set = funding.attrs.set;
	return funding;
};

/*
example asset:
TODO: move to own file
*/
var Asset = function (options) {
	var asset = {};
	
	asset.attrs = Immutable.fromJS({
		purchaseCost: 1000,
		perTurnCost: 30,
		valuationPerTurn: 30*4
	});
	asset.get = asset.attrs.get;
	asset.set = asset.attrs.set;
	return asset;
}

var assets = [
	// TODO: create assets
];

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
			var game = new Game(startup);
			var expectedFunding;

			startup.purchaseAsset(asset);
			expectedFunding = startup.get('funding') - asset.get('perTurnCost');
			game.nextTurn();
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

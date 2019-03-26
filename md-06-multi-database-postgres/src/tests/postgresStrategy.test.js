const assert = require('assert');

const PostgresStrategy = require('../db/strategies/PostgresStrategy');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new PostgresStrategy());

describe('PostgreSQL Strategy', function () {
    this.timeout(Infinity);

    it('PostgresSQL connection', async () => {
        const result = await context.isConnected();
        assert.equal(result, true);
    });

});
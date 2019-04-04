const assert = require('assert');

const PostgresStrategy = require('../db/strategies/PostgresStrategy');
const Context = require('../db/strategies/base/contextStrategy');

const MOCK_HEROI_CADASTRAR = { nome: 'Gaviao Negro', poder: 'flexas' };

const context = new Context(new PostgresStrategy());

describe('PostgreSQL Strategy', function () {
    this.timeout(Infinity);

    it('PostgresSQL connection', async () => {
        const result = await context.isConnected();
        assert.equal(result, true);
    });

    it('cadastrar', async () => {
        const result = await context.create(MOCK_HEROI_CADASTRAR);
        delete result.dataValues.id;
        assert.deepEqual(result.dataValues, MOCK_HEROI_CADASTRAR);
    });

    it('listar', async () => {
        const [result] = await context.read(MOCK_HEROI_CADASTRAR);
        delete result.id;
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
    });

});
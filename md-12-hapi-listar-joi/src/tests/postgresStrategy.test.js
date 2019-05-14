const assert = require('assert');

const PostgresStrategy = require('../db/strategies/postgres/PostgresStrategy');
const HeroiSchema = require('../db/strategies/postgres/schemas/heroesSchema');
const Context = require('../db/strategies/base/contextStrategy');

const MOCK_HEROI_CADASTRAR = { nome: 'Gaviao Negro', poder: 'flexas' };
const MOCK_HEROI_ATUALIZAR = { nome: 'Mulher Gavião', poder: 'grito' };

let context = {};

describe('PostgreSQL Suite de testes', function () {
    this.timeout(Infinity);

    this.beforeAll(async function() {

        const connection  = await PostgresStrategy.connect();
        const model  = await PostgresStrategy.defineModel(connection, HeroiSchema);
        context = new Context(new PostgresStrategy(connection, model));

        await context.delete();
        await context.create(MOCK_HEROI_CADASTRAR);
        await context.create(MOCK_HEROI_ATUALIZAR);
    });

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

    it('atualizar', async () => {
        const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome });

        const novoItem = {
            ...MOCK_HEROI_CADASTRAR,
            nome: 'Mulher Maravilha',
        };
        const [result] = await context.update(itemAtualizar.id, novoItem);
        const [itemAtualizado] = await context.read({ id: itemAtualizar.id });

        assert.deepEqual(result, 1);
        assert.deepEqual(itemAtualizado.nome, novoItem.nome);
    });

    it('remover', async () => {
        await context.create(MOCK_HEROI_ATUALIZAR);
        const [item] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome });
        const result = await context.delete(item.id);
        assert.deepEqual(result, 1);
    });

});
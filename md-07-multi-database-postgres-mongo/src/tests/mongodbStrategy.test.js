const assert = require('assert');

const MongoDbStrategy = require('../db/strategies/mongoDbStrategy');
const Context = require('../db/strategies/base/contextStrategy');
const context = new Context(new MongoDbStrategy());

const MOCK_HEROI_CADASTRAR = {
    nome: 'Gaviao Negro',
    poder: 'flexas'
};

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Mulher Maravilha',
    poder: 'força'
};
let MOCK_HEROI_ATUALIZAR_ID = '';

describe('MongoDB Suite de testes', function () {

    this.beforeAll(async () => {
        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ATUALIZAR_ID = result._id
    })

    it('verificar conexao', async () => {
        const result = await context.isConnected();
        const expected = 'Conectado';
        assert.deepEqual(result, expected)
    });

    it('cadastrar', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
        
        assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
    })    

    it('listar', async () => {
        const [{ nome, poder}] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome})
        const result = {
            nome, poder
        }
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('atualizar', async () => {
        const result = await context.update(MOCK_HEROI_ATUALIZAR_ID, {
            poder: 'Laço'
        })
        assert.deepEqual(result.nModified, 1)
    })

    it('remover', async () => {
        const result = await context.delete(MOCK_HEROI_ATUALIZAR_ID)
        assert.deepEqual(result.n, 1)
    })

})
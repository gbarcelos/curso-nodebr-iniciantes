const assert = require('assert');
const api = require('./../api');
let app = {};
const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolin Colorado',
    poder: 'Marreta biônica'
}
const MOCK_HEROI_INICIAL = {
    nome: 'Gavião negro',
    poder: 'A Pontaria'
}
let MOCK_ID = '';
describe.only('Suite de testes da API Heroes', function () {

    this.beforeAll(async () => {
        app = await api;
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: JSON.stringify(MOCK_HEROI_INICIAL)
        });
        const dados = JSON.parse(result.payload);
        MOCK_ID = dados._id;
    })

    it('Listar /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=0'
        });
        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(Array.isArray(dados));
    });

    it('Listar /herois - deve filtrar um item', async () => {
        const TAMANHO_LIMITE = 1000;
        const NAME = 'Clone-510';
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`
        });
        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(dados[0].nome === NAME);
    });


    it('Cadastrar POST /herois', async () => {
        const result = await app.inject({
            method: 'POST',
            url: `/herois`,
            payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
        });
        const statusCode = result.statusCode;
        const {
            message,
            _id
        } = JSON.parse(result.payload);
        
        assert.ok(statusCode === 200);
        assert.notStrictEqual(_id, undefined);
        assert.deepEqual(message, 'Heroi cadastrado com sucesso!');
    });

    it('Atualizar PATCH - /herois/:id', async () => {
        const _id = MOCK_ID;
        const expected = {
            poder: 'Super Mira'
        }
        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
        });
        
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode === 200);
        assert.deepEqual(dados.message, 'Heroi atualizado com sucesso!');
    });

    it('Atualizar PATCH - /herois/:id - não deve atualizar com ID incorreto', async () => {
        const _id = `${MOCK_ID}01`;
        const expected = {
            poder: 'Super Mira'
        }
        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
        });
        
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode === 200);
        assert.deepEqual(dados.message, 'Não foi possivel atualizar!');
    });
})
const assert = require('assert');
const api = require('./../api');
let app = {};

describe('Suite de testes da API Heroes', function () {

    this.beforeAll(async () => {
        app = await api;
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

})
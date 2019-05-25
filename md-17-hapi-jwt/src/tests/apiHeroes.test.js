const assert = require('assert');
const api = require('./../api');
let app = {};

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvYW8iLCJpZCI6MSwiaWF0IjoxNTU4NzkxOTQwfQ.wQ9evf2vUjB60pj3SxLk8Za8ZN4w7eM6GTiQBAknYEs';
const headers = {
    Authorization: TOKEN
}

const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolin Colorado',
    poder: 'Marreta biônica'
}
const MOCK_HEROI_INICIAL = {
    nome: 'Gavião negro',
    poder: 'A Pontaria'
}
let MOCK_ID = '';
describe('Suite de testes da API Heroes', function () {

    this.beforeAll(async () => {
        app = await api;
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            headers,
            payload: JSON.stringify(MOCK_HEROI_INICIAL)
        });
        const dados = JSON.parse(result.payload);
        MOCK_ID = dados._id;
    })

    it('Listar /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            headers,
            url: '/herois?skip=0&limit=0'
        });
        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(Array.isArray(dados));
    });

    it('Listar /herois - deve filtrar um item', async () => {
        const TAMANHO_LIMITE = 1000;
        const NAME = MOCK_HEROI_INICIAL.nome;
        const result = await app.inject({
            method: 'GET',
            headers,
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
            headers,
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
            headers,
            url: `/herois/${_id}`,
            payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
        });
        
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode === 200);
        assert.deepEqual(dados.message, 'Heroi atualizado com sucesso!');
    });

    it('Remover DELETE - /herois/:id', async () => {
        const _id = MOCK_ID;
        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/herois/${_id}`
        });
        
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode === 200);
        assert.deepEqual(dados.message, 'Heroi removido com sucesso!');
    });

    it('Atualizar PATCH - /herois/:id - não deve atualizar com ID incorreto', async () => {
        const _id = MOCK_ID;
        const result = await app.inject({
            method: 'PATCH',
            headers,
            url: `/herois/${_id}`,
            payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
        });
        
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);
        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'Não foi possivel atualizar!'
        };

        assert.ok(statusCode === 412);
        assert.deepEqual(dados, expected);
    });
})
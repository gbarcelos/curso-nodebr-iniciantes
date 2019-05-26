const assert = require('assert');
const api = require('./../api');
const Context = require('../db/strategies/base/contextStrategy');
const PostgresStrategy = require('../db/strategies/postgres/PostgresStrategy');
const UsuarioSchema = require('../db/strategies/postgres/schemas/usuarioSchema')
let app = {};

const USER = {
    username: 'joao',
    password: '123'
}

const USER_DB = {
    username: USER.username.toLowerCase(),
    password: '$2b$04$iXfJaaYHkHuOnplTdwUJk.zvD8SO7yuoIpU1.3WagPW.iIEUd2.eW'
}

describe('Suite de testes da autenticação oauth', function () {

    this.beforeAll(async () => {
        app = await api;

        const connectionPostgres = await PostgresStrategy.connect();
        const model = await PostgresStrategy.defineModel(connectionPostgres, UsuarioSchema);
        const context = new Context(new PostgresStrategy(connectionPostgres, model));
        await context.update(null, USER_DB, true);
    })

    it('Deve obter um token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER
        });
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.deepEqual(statusCode, 200);
        assert.ok(dados.token.length > 10);
    });

    it('Deve retornar não autorizado ao tentar obter um token com login inexistente', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'jose',
                password: '123'
            }
        });
        const statusCode = result.statusCode;

        assert.deepEqual(statusCode, 401);
        assert.deepEqual(JSON.parse(result.payload).error, "Unauthorized");
    });
})
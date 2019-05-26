const assert = require('assert');

const PasswordHelper = require('../helpers/passwordHelper');

const SENHA = '123';
const HASH = '$2b$04$iXfJaaYHkHuOnplTdwUJk.zvD8SO7yuoIpU1.3WagPW.iIEUd2.eW'

describe('Suite de testes do userHelper', function () {

    this.beforeAll(async () => {
    })

    it('Deve gerar um hash a partir de uma senha', async () => {
        const result = await PasswordHelper.hashPassword(SENHA);

        assert.ok(result.length > 10);
    });

    it('Deve comparar uma senha e seu hash', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH);

        assert.ok(result);
    });
})
const { deepEqual, ok } = require('assert');

const Database = require('./database');

const DEFAULT_ITEM_CADASTRAR = { nome: 'Flash', poder: 'speed', id: 1 };

describe('Suite de manipulação de herois', () => {

    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const [resultado] = await Database.listar(expected.id);
        deepEqual(resultado, expected);
    });
});
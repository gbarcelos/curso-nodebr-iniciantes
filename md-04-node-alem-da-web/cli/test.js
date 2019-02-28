const { deepEqual, ok } = require('assert');

const Database = require('./database');

const DEFAULT_ITEM_CADASTRAR = { nome: 'Flash', poder: 'speed', id: 1 };

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Lanterna Verde',
    poder: 'Anel do poder',
    id: 2,
};

describe('Suite de manipulação de herois', () => {

    before(async () => {
        await Database.remover();
        await Database.cadastrar(DEFAULT_ITEM_CADASTRAR);
        await Database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
    });

    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const [resultado] = await Database.listar(expected.id);
        deepEqual(resultado, expected);
    });

    it('deve cadastrar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const resultado = await Database.cadastrar(DEFAULT_ITEM_CADASTRAR);

        const [atual] = await Database.listar(DEFAULT_ITEM_CADASTRAR.id);

        deepEqual(atual, expected);
    });

    it('deve remover um heroi por id', async () => {
        const expected = true;
        const resultado = await Database.remover(DEFAULT_ITEM_CADASTRAR.id);

        deepEqual(resultado, expected);
    });

    it('deve atualizar um heroi por id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Dinheiro',
        };

        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro',
        };
        await Database.atualizar(DEFAULT_ITEM_CADASTRAR.id, novoDado);
        const [resultado] = await Database.listar(DEFAULT_ITEM_CADASTRAR.id);

        deepEqual(resultado, expected);
    });
});
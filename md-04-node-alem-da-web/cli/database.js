const { writeFile, readFile } = require('fs');

const { promisify } = require('util');

const [writeFileAsync, readFileAsync] = [
    promisify(writeFile),
    promisify(readFile),
];

class Database {

    constructor() {
        this.NOME_ARQUIVO = 'heroes.json';
    }

    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
        return JSON.parse(arquivo.toString());
    }

    async listar(id) {

        const dados = await this.obterDadosArquivo();

        return dados.filter(item => (id ? item.id == id : true));
    }

    async escreverArquivo(dados) {

    }

}

module.exports = new Database();
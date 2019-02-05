/*
0 - Obter um usuário
1 - Obter o numero de telefone de um usuário a partir de seu ID
2 - Obter o endereço do usuário pelo ID
*/

const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {

    return new Promise(function resolvePromise(resolve, reject) {

        setTimeout(function () {
            return resolve({
                id: 1,
                nome: 'Pedro',
                dataNascimento: new Date()
            })
        }, 1000);
    })
}

function obterTelefone(idUsuario) {

    return new Promise(function resolvePromise(resolve, reject) {

        setTimeout(function () {
            return resolve({
                numero: 974859615,
                ddd: 31
            })
        }, 2000);
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(function () {
        return callback(null, {
            rua: 'nome de rua',
            numero: 8596
        })
    }, 2000);
}

main()

async function main(){

    try {
        console.time('medida-promise')
        const usuario = await obterUsuario()
        const telefone = await obterTelefone(usuario.id)
        const endereco = await obterEnderecoAsync(usuario.id)

        console.log(`
            Nome: ${usuario.nome}
            Telefone: (${telefone.ddd}) ${telefone.numero}
            Endereco: ${endereco.rua}, ${endereco.numero}
        `)

        console.timeEnd('medida-promise')

    } catch (error) {
        console.error('DEU RUIM', error)
    }
}
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

const usuarioPromise = obterUsuario()

usuarioPromise
    .then(function (usuario) {
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result){
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result

            }
        })
    })
    .then(function (resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result){
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        });
    })
    .then(function (resultado) {
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.numero}
        `)
    })
    .catch(function (error){
        console.error('DEU RUIM', error)
    })
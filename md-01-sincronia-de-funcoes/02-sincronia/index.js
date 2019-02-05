/*
0 - Obter um usuário
1 - Obter o numero de telefone de um usuário a partir de seu ID
2 - Obter o endereço do usuário pelo ID
*/
function obterUsuario(callback){
    setTimeout(function (){
        return callback(null, {
            id: 1,
            nome: 'Pedro',
            dataNascimento: new Date()
        })
    }, 1000);
}

function obterTelefone(idUsuario, callback){
    setTimeout(function (){
        return callback(null, {
            numero: 974859615,
            ddd: 31
        })
    }, 2000);
}

function obterEndereco(idUsuario, callback){
    setTimeout(function (){
        return callback(null, {
            rua: 'nome de rua',
            numero: 8596
        })
    }, 2000);
}

obterUsuario(function resolverUsuario(erro, usuario){
    if (erro){
        console.error('Erro em Usuario', error)
        return;
    }
    obterTelefone(usuario.id, function resolverTelefone(erro2, telefone){
        if (erro2){
            console.error('Erro em Telefone', erro2)
            return;
        }
        obterEndereco(usuario.id, function resolverEndereco(erro3, endereco){
            if (erro3){
                console.error('Erro em Endereco', erro3)
                return;
            }
            console.log(`
                Nome: ${usuario.nome},
                Endereco: ${endereco.rua}, ${endereco.numero},
                Telefone: (${telefone.ddd}) ${telefone.numero}
            `)
        })
    })
})
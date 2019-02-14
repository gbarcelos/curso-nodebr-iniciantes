const service = require('./service')

async function main() {
    try {
        const results = await service.obterPessoas(`a`)

        console.log('names', metodo_3(results))

    } catch (error) {
        console.error(`DEU RUIM`, error)
    }
}
main()

function metodo_1(results) {

    const names = []
    results.results.forEach(function (item) {
        names.push(item.name)
    })

    return names;
}

function metodo_2(results) {

    const names = results.results.map(function (pessoa) {
        return pessoa.name
    })

    return names;
}

function metodo_3(results) {

    const names = results.results.map((pessoa) => pessoa.name)

    return names;
}
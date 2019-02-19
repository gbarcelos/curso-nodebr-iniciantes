// Este exemplo demonstra a diferença entre Promise e eventos como os do EventEmitter
//
// A Promise é utilizada para uma única ação.
// Eventos são utilizados para ações contínuas.
//
const stdin = process.openStdin()

function main() {
    return new Promise(function (resolve, reject) {
        stdin.addListener('data', function (value) {
            return resolve(value)
        })
    })
}
main().then(function (resultado) {
    console.log('resultado', resultado.toString())
})
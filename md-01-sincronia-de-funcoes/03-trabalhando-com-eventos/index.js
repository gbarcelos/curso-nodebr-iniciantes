const EventEmitter = require('events')
class Emissor extends EventEmitter {

}
const emissor = new Emissor()
const nomeEvento = 'usuario:click'
emissor.on(nomeEvento, function (click) {
    console.log('um usuario clicou', click)
})

emissor.emit(nomeEvento, 'na barra de rolagem')
emissor.emit(nomeEvento, 'no ok')

let count = 0
setInterval(function () {
    emissor.emit(nomeEvento, 'no ok' + (count++))
}, 1000)
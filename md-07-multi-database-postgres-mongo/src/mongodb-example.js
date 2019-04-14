const Mongoose = require('mongoose')
Mongoose.connect('mongodb://meuuser:minhasenhasecreta@localhost:27017/heroes', {
    useNewUrlParser: true
}, (error) => {
    if (!error) return;
    console.error('error to connect on mongodb', error)
})
const connection = Mongoose.connection
connection.once('open', () => console.log('db is running!'))

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    nascimento: {
        type: Date,
        required: true
    },
})
const model = Mongoose.model('heroes', heroiSchema)
async function main() {
    const result = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro',
        nascimento: new Date(1970, 01, 01)
    })
    console.log('result', result)

    const items = await model.find()
    console.log('items', items)

}
main()
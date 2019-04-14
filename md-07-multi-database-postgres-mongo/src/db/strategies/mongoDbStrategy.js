const IDb = require('./base/interfaceDb');
const Mongoose = require('mongoose');

const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando',
}

class MongoDBStrategy extends IDb {

    constructor() {
        super();
        this._driver = null;
        this._heroes = null;
        this.connect();
    }

    connect() {
        Mongoose.connect('mongodb://meuuser:minhasenhasecreta@localhost:27017/heroes', {
            useNewUrlParser: true
        }, (error) => {
            if (!error) return;
            console.error('error to connect on mongodb', error)
        });
        this._driver = Mongoose.connection;
        this._driver.once('open', () => console.log('db is running!'));
        this.defineModel();
    }

    defineModel() {
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
                default: new Date()
            },
        })
        this._heroes = Mongoose.models.heroes || Mongoose.model('heroes', heroiSchema)
    }

    async isConnected() {
        const state = STATUS[this._driver.readyState];
        if (state === 'Conectado') return state;

        if (state !== 'Conectando') return state;

        await new Promise(resolve => setTimeout(resolve, 1000));

        return STATUS[this._driver.readyState];
    }

    async create(item) {
        return this._heroes.create(item)
    }

    async read(item, skip=0, limit=10) {
        return this._heroes.find(item).skip(skip).limit(limit);
    }
}

module.exports = MongoDBStrategy;

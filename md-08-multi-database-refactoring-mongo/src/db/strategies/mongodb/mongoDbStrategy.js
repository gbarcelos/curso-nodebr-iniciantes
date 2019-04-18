const IDb = require('../base/interfaceDb');
const Mongoose = require('mongoose');

const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando',
}

class MongoDBStrategy extends IDb {

    constructor(connection, schema) {
        super();
        this._connection = connection;
        this._schema = schema;
    }

    static connect() {
        Mongoose.connect('mongodb://meuuser:minhasenhasecreta@localhost:27017/heroes', {
            useNewUrlParser: true
        }, (error) => {
            if (!error) return;
            console.error('error to connect on mongodb', error)
        });
        const connection = Mongoose.connection;
        connection.once('open', () => console.log('db is running!'));
        return connection;
    }

    async isConnected() {
        const state = STATUS[this._connection.readyState];
        if (state === 'Conectado') return state;

        if (state !== 'Conectando') return state;

        await new Promise(resolve => setTimeout(resolve, 1000));

        return STATUS[this._connection.readyState];
    }

    async create(item) {
        return this._schema.create(item)
    }

    async read(item, skip=0, limit=10) {
        return this._schema.find(item).skip(skip).limit(limit);
    }

    async update(id, item) {
        return this._schema.updateOne({_id: id}, { $set: item})
    }

    async delete(id) {
        return this._schema.deleteOne({_id: id})
    }
}

module.exports = MongoDBStrategy;

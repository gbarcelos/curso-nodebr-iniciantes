const IDb = require('../base/interfaceDb');

const Sequelize = require('sequelize');

class PostgresStrategy extends IDb {

    constructor(connection, schema) {
        super();
        this._connection = connection;
        this._schema = schema;
    }

    async isConnected() {
        try {
            await this._connection.authenticate();
            return true;
        } catch (error) {
            console.log('fail!', error);
            return false;
        }
    }

    static async defineModel(connection, schema) {
        const model = connection.define(
            schema.name, schema.schema, schema.options
        );
        await model.sync();
        return model;
    }

    async create(item) {
        return this._schema.create(item, { raw: true });
    }

    async read(item, skip=0, limit=10) {
        return this._schema.findAll({ where: item, raw: true });
    }

    async update(id, item, upsert = false) {
        const fn = upsert ? 'upsert' : 'update'
        return this._schema[fn](item, { where: { id } });
    }

    async delete(id) {
        const query = id ? { id } : {};
        return this._schema.destroy({ where: query });
    }

    static async connect() {
        const connection = new Sequelize(
            'heroes',
            'meuuser',
            'minhasenhasecreta',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorAliases: false,
                logging: false
            }
        );
        return connection;
    }
}

module.exports = PostgresStrategy;

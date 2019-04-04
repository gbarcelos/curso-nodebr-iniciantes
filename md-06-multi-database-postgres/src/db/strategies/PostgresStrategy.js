const IDb = require('./base/interfaceDb');

const Sequelize = require('sequelize');

class PostgresStrategy extends IDb {

    constructor() {
        super();
        this._driver = null;
        this._herois = null;
        this._connect();
    }

    async isConnected() {
        try {
            await this._driver.authenticate();
            return true;
        } catch (error) {
            console.log('fail!', error);
            return false;
        }
    }

    async defineModel() {
        this._herois = this._driver.define(
            'herois',
            {
                id: {
                    type: Sequelize.INTEGER,
                    required: true,
                    primaryKey: true,
                    autoIncrement: true,
                },
                nome: {
                    type: Sequelize.STRING,
                    required: true,
                },
                poder: {
                    type: Sequelize.STRING,
                    required: true,
                }
            },
            {
                //opcoes para base existente
                tableName: 'tb_herois',
                freezeTableName: false,
                timestamps: false
            }
        );
        await this._herois.sync();
    }

    create(item) {
        return this._herois.create(item, { raw: true });
    }

    read(item) {
        return this._herois.findAll({ where: item, raw: true });
    }

    _connect() {
        this._driver = new Sequelize(
            'heroes',
            'meuuser',
            'minhasenhasecreta',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorAliases: false
            }
        );
        this.defineModel();
    }
}

module.exports = PostgresStrategy;

const IDb = require('./base/interfaceDb');

const Sequelize = require('sequelize');

class PostgresStrategy extends IDb {

    constructor() {
        super();
        this._driver = null;
        this._herois = null;
        this.connect();
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

    update(id, item) {
        return this._herois.update(item, { where: { id } });
    }

    delete(id) {
        const query = id ? { id } : {};
        return this._herois.destroy({ where: query });
    }

    connect() {
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

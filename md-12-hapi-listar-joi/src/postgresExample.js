const Sequelize = require('sequelize');
const driver = new Sequelize(
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

async function main() {
    const Herois = driver.define(
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

    await Herois.sync();

    const result = await Herois.create({
        nome: 'John',
        poder: 'Hancock',
    });

    console.log(
        'result',
        await Herois.findAll({ raw: true, attributes: ['nome', 'poder', 'id'] }),
    );
};

main();
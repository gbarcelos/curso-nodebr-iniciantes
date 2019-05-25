const Hapi = require('hapi');

const Context = require('./db/strategies/base/contextStrategy');

const MongoDB = require('./db/strategies/mongodb/mongoDbStrategy');

const heroiSchema = require('./db/strategies/mongodb/schemas/heroesSchema');

const HeroRoutes = require('./routes/heroRoutes');

const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const Inert = require('inert');

const app = new Hapi.Server({
    port: 4000
});

function mapRoutes (instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDB.connect();
    const context = new Context(new MongoDB(connection, heroiSchema));

    const swaggerOptions = {
        info: {
            title: '#CursoNodeBR - API Herois',
            version: 'v1.0'
        },
        lang: 'pt'
    }

    await app.register([
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    app.route(
        mapRoutes(new HeroRoutes(context), HeroRoutes.methods())
    );

    await app.start();
    console.log('server running at', app.info.port);
    return app;
}
module.exports = main();
const Hapi = require('hapi');

const Context = require('./db/strategies/base/contextStrategy');

const MongoDB = require('./db/strategies/mongodb/mongoDbStrategy');

const heroiSchema = require('./db/strategies/mongodb/schemas/heroesSchema');

const app = new Hapi.Server({
    port: 4000
});

async function main() {
    const connection = MongoDB.connect();
    const context = new Context(new MongoDB(connection, heroiSchema));

    app.route({
        path: '/herois',
        method: 'GET',
        handler: (request, headers) => {
            return context.read();
        }
    });

    await app.start();
    console.log('server running at', app.info.port);
}
main();
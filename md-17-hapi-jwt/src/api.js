const Hapi = require('hapi');

const Context = require('./db/strategies/base/contextStrategy');

const MongoDB = require('./db/strategies/mongodb/mongoDbStrategy');

const heroiSchema = require('./db/strategies/mongodb/schemas/heroesSchema');

const HeroRoutes = require('./routes/heroRoutes');
const AuthRoutes = require('./routes/authRoutes');

const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const Inert = require('inert');

const HapiJwt = require('hapi-auth-jwt2');

const JWT_SECRET = 'MEU_SEGREDO';

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
        HapiJwt,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        /*
        options: {
            expiresIn: 20
        }
        */
       validate: (dado, request) => {
            return {
                isValid: true
            }
       }
    });

    app.auth.default('jwt');

    app.route([
        ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
        ...mapRoutes(new AuthRoutes(JWT_SECRET), AuthRoutes.methods())
    ]);

    await app.start();
    console.log('server running at', app.info.port);
    return app;
}
module.exports = main();
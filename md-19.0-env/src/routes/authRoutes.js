const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
const Boom = require('boom');
const Jwt = require('jsonwebtoken');
const PasswordHelper = require('../helpers/passwordHelper');

const failAction = (rquest, headers, erro) => {
    throw erro;
};

class AuthRoutes extends BaseRoute {
    constructor(secret, db) {
        super();
        this.secret = secret;
        this.db = db;
    }

    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                tags: ['api'],
                description: 'Deve obter token',
                notes: 'Faz Login com user e password',
                auth: false,
                validate: {
                    failAction,
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (request, headers) => {
                const {
                    username,
                    password

                } = request.payload;

                const [usuario] = await this.db.read({
                    username: username.toLowerCase()
                });

                if (!usuario) {
                    return Boom.unauthorized('Usuário informado não existe');
                }

                const math = await PasswordHelper.comparePassword(password.toLowerCase(), usuario.password);

                if (!math) {
                    return Boom.unauthorized('Usuário ou senha inválido');
                }

                const token = Jwt.sign({
                    username: username,
                    id: usuario.id
                }, this.secret);

                return {
                    token
                }
            }
        }
    }
}
module.exports = AuthRoutes;
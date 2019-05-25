const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
const Boom = require('boom');
const Jwt = require('jsonwebtoken');

const USER = {
    username: 'joao',
    password: '123'
}

const failAction = (rquest, headers, erro) => {
    throw erro;
};

class AuthRoutes extends BaseRoute {
    constructor(secret) {
        super();
        this.secret = secret;
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
            handler: (request, headers) => {
                const {
                    username,
                    password

                } = request.payload;

                if (username.toLowerCase() !== USER.username || password.toLowerCase() !== USER.password) {
                    return Boom.unauthorized();
                }

                const token = Jwt.sign({
                    username: username,
                    id: 1
                }, this.secret);

                return {
                    token
                }
            }
        }
    }
}
module.exports = AuthRoutes;
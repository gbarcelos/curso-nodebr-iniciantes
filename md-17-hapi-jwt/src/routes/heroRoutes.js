const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
const Boom = require('boom');

const failAction = (rquest, headers, erro) => {
    throw erro;
};

const headers = Joi.object({
    authorization: Joi.string().required()
}).unknown();

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                tags: ['api'],
                description: 'Deve listar heróis',
                notes: 'Pode paginar resultados e filtrar por nome',
                validate: {
                    failAction,
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    },
                    headers
                }
            },
            handler: (request, headers) => {
                try {
                    const {
                        skip,
                        limit,
                        nome

                    } = request.query;

                    let query = {};
                    if (nome) {
                        query.nome = nome;
                    }

                    return this.db.read(query, skip, limit);
                } catch (error) {
                    return Boom.internal();
                }
            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                tags: ['api'],
                description: 'Deve cadastrar heroi',
                notes: 'Deve cadastrar heroi por nome e poder',
                validate: {
                    failAction,
                    headers,
                    payload: {
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(100)
                    }
                }
            },
            handler: async (request, headers) => {
                try {
                    const {
                        nome,
                        poder

                    } = request.payload;

                    const result = await this.db.create({ nome, poder });

                    return {
                        message: 'Heroi cadastrado com sucesso!',
                        _id: result._id
                    };
                } catch (error) {
                    return Boom.internal();
                }
            }
        }
    }

    update() {
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            config: {
                tags: ['api'],
                description: 'Deve atualizar heroi por id',
                notes: 'Pode atualizar qualquer campo',
                validate: {
                    params: {
                        id: Joi.string().required()
                    },
                    headers,
                    payload: {
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(2).max(100)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const {
                        id
                    } = request.params;

                    const {
                        payload

                    } = request;
                    const dadosString = JSON.stringify(payload);
                    const dados = JSON.parse(dadosString);

                    const result = await this.db.update(id, dados);

                    if (result.nModified !== 1)
                        return Boom.preconditionFailed('Não foi possivel atualizar!');

                    return {
                        message: 'Heroi atualizado com sucesso!'
                    };
                } catch (error) {
                    return Boom.internal();
                }
            }
        }
    }

    delete() {
        return {
            path: '/herois/{id}',
            method: 'DELETE',
            config: {
                tags: ['api'],
                description: 'Deve remover heroi por id',
                notes: 'O Id deve ser válido',
                validate: {
                    failAction,
                    headers,
                    params: {
                        id: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                try {
                    const {
                        id
                    } = request.params;
                    const result = await this.db.delete(id);
                    if (result.n !== 1)
                        return Boom.preconditionFailed('Não foi possivel remover!');

                    return {
                        message: 'Heroi removido com sucesso!'
                    };
                } catch (error) {
                    return Boom.internal();
                }
            }
        }
    }
}
module.exports = HeroRoutes;
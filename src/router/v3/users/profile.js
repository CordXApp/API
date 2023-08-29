const { sqlQuery } = require('@controllers/sqlQuery.js')
const config = require('@configs/main')

module.exports = async function (fastify) {
    fastify.route({
        url: '/profile/:userId/:secret',
        method: ['GET'],
        config: {
            rateLimit: {
                max: 100,
                timeWindow: 10000,
                errorResponseBuilder: function () {
                    return {
                        code: 429,
                        error: 'Enhance your calm',
                        message: `Rate limited, please try again in: ${this.timeWindow}ms`,
                        date: Date.now(),
                        expiresIn: this.timeWindow
                    }
                },
                onExceeding: function () {
                    return {
                        code: 429,
                        error: 'Enhance your calm',
                        message: `Rate limited, please try again in: ${this.timeWindow}ms`,
                        date: Date.now(),
                        expiresIn: this.timeWindow
                    }
                },
                onExceeded: function () {
                    return {
                        code: 420,
                        error: 'Enhance your calm',
                        message: `Whoops, looks like you have been rate limited. Please wait: ${this.timeWindow}ms`,
                        date: Date.now(),
                        expiresIn: this.timeWindow
                    }
                }
            }
        },
        schema: {
            summary: "Get a CordX user's Profile",
            description: "Returns a given cordx user's cordx secret etc",
            tags: ['Users'],
            params: {
                type: 'object',
                properties: {
                    userId: {
                        type: 'string',
                        description: 'A valid discord user id/snowflake'
                    },
                    secret: {
                        type: 'string',
                        description: 'A valid cordx user secret'
                    }
                }
            },
            response: {
                200: {
                    description: 'Successful request',
                    type: 'object',
                    properties: {
                        user: { type: 'string' },
                        secret: { type: 'string' },
                        cookie: { type: 'string' },
                        webhook: { type: 'string' }
                    }
                },
                400: {
                    description: 'Bad request',
                    type: 'object',
                    properties: {
                        code: { type: 'string' },
                        message: { type: 'string' },
                        status: { type: 'number' }
                    }
                },
                404: {
                    description: 'User not found',
                    type: 'object',
                    properties: {
                        code: { type: 'string' },
                        message: { type: 'string' },
                        status: { type: 'number' }
                    }
                },
                500: {
                    description: 'Request error',
                    type: 'object',
                    properties: {
                        code: { type: 'string' },
                        errormsg: { type: 'string' },
                        status: { type: 'number' }
                    }
                },
                429: {
                    description: 'Rate limited',
                    type: 'object',
                    properties: {
                        code: { type: 'number' },
                        error: { type: 'string' },
                        message: { type: 'string' },
                        date: { type: 'string' },
                        expiresIn: { type: 'number' }
                    }
                }
            }
        },
        preHandler: async (request, reply) => {
            const { userId, secret } = request.params

            if (!userId) {
                reply.code(404).send({
                    code: 'USER_NOT_FOUND',
                    message: `The provided user #${userId} was not found!`,
                    status: 404
                })
                return null
            }

            if (!secret || secret !== config.api) {
                reply.code(400).send({
                    code: 'SECRET_NOT_FOUND',
                    message: 'Please provide a valid CordX Owner Secret',
                    status: 400
                })

                return null
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')

            const user = await sqlQuery({ query: `SELECT * FROM users WHERE folder="${request.params.userId}"` })
                .then(u => u)
                .catch(e => {
                    return reply.code(500).send({
                        code: 'REQUEST_ERROR',
                        errormsg: `${e.message}`,
                        status: 500
                    })
                })

            return reply.code(200).send({
                user: user[0].userid,
                secret: user[0].secret,
                cookie: user[0].cookie,
                webhook: user[0].webhook
            })
        }
    })
}

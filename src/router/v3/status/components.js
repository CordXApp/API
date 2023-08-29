const config = require('@configs/main')

module.exports = async function (fastify) {
    fastify.route({
        url: '/components/:secret',
        method: ['GET'],
        schema: {
            summary: 'List all our status page components',
            description: 'Restricted Endpoint | CordX Owners Only',
            tags: ['Status'],
            params: {
                type: 'object',
                properties: {
                    secret: {
                        type: 'string',
                        description: 'Our system status secret assigned to our owners.'
                    }
                }
            },
            response: {
                200: {
                    description: 'Successful request',
                    type: 'array',
                    properties: {}
                },
                401: {
                    description: 'Unauthorized',
                    type: 'object',
                    properties: {
                        code: { type: 'string' },
                        message: { type: 'string' },
                        status: { type: 'string' }
                    }
                }
            }
        },
        preHandler: async (request, reply) => {
            const { secret } = request.params

            if (!secret) {
                reply.code(401).send({
                    code: 'NO_SECRET_PROVIDED',
                    message: 'please provide the valid status secret',
                    status: 404
                })

                return null
            }

            if (secret !== config.status) {
                reply.code(401).send({
                    code: 'INVALID_SECRET_PROVIDED',
                    message: 'you provided an invalid secret for this endpoint',
                    status: 404
                })

                return null
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')

            const response = await fetch('https://api.instatus.com/v2/ckq7ppm4g124913arohzh7jn9ek/components', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${request.params.secret}`,
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()

            reply.code(200).send(data)
        }
    })
}

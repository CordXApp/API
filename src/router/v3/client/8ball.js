const { generate8ballRes } = require('@controllers/generate8ballRes')

module.exports = async function (fastify) {
    fastify.route({
        url: '/8ball',
        method: ['GET'],
        schema: {
            summary: "Response's for our discord bot's 8ball command",
            description: 'Generates a random response.',
            tags: ['Client'],
            response: {
                200: {
                    description: 'Successful request',
                    type: 'object',
                    properties: {
                        response: { type: 'string' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')

            const response = await generate8ballRes()

            return reply.code(200).send({
                response: response
            })
        }
    })
}

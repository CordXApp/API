const { genYoMamaJoke } = require('@controllers/genYoMamaJoke')

module.exports = async function (fastify) {
    fastify.route({
        url: '/yomomma',
        method: ['GET'],
        schema: {
            summary: 'Random yo momma joke.',
            description: 'Generates a random yo momma joke.',
            tags: ['Client'],
            response: {
                200: {
                    description: 'Successful request',
                    type: 'object',
                    properties: {
                        joke: { type: 'string' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')

            const random = await genYoMamaJoke()

            return reply.code(200).send({
                joke: random
            })
        }
    })
}

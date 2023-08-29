const { generateFact } = require('@controllers/generateFact')

module.exports = async function (fastify) {
    fastify.route({
        url: '/facts/random',
        method: ['GET'],
        schema: {
            summary: 'Random fact.',
            description: 'Generates a random fact.',
            tags: ['Client'],
            response: {
                200: {
                    description: 'Successful request',
                    type: 'object',
                    properties: {
                        fact: { type: 'string' },
                        source: { type: 'string' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')

            const randomFact = await generateFact()

            return reply.code(200).send({
                fact: randomFact.text,
                source: randomFact.source
            })
        }
    })
}

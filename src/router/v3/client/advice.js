const { generateAdvice } = require('@controllers/generateAdvice')

module.exports = async function (fastify) {
    fastify.route({
        url: '/advice/random',
        method: ['GET'],
        schema: {
            summary: 'Random piece of possibly useful advice',
            description: 'Generates a random piece of advice.',
            tags: ['Client'],
            response: {
                200: {
                    description: 'Successful request',
                    type: 'object',
                    properties: {
                        advice: { type: 'string' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')

            const advice = await generateAdvice()

            return reply.code(200).send({
                advice: advice
            })
        }
    })
}

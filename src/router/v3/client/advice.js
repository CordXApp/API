const { generateAdvice } = require('@controllers/generateAdvice');

module.exports = async (fastify, opts) => {

    fastify.get('/advice/random', async (request, reply) => {
        
        reply.header('Content-Type', 'application/json');

        let advice = await generateAdvice();

        return reply.code(200).send({
            advice: advice
        })
    })
}
const { generateAdvice } = require('@controllers/generateAdvice')

module.exports = async fastify => {
    fastify.get('/advice/random', async reply => {
        reply.header('Content-Type', 'application/json')

        const advice = await generateAdvice()

        return reply.code(200).send({
            advice: advice
        })
    })
}

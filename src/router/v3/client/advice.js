const logs = require('@plugins/logger')
const { generateFact } = require('@controllers/generateFact')

module.exports = async (fastify, opts) => {

    fastify.get('/advice/random', async (request, reply) => {
        
        reply.header('Content-Type', 'application/json');

        await fetch('https://api.adviceslip.com/advice')
        .then(res => res.json())
        .then(data => {

            return reply.code(200).send({
                advice: data.slip.advice
            })
        })
        .catch(async (e) => {

            await logs.send(`Error generating advice: ${e.stack}`, 'error')

            return reply.code(500).send({
                message: 'Unable to generate your advice',
                error: true,
                fatal: false,
                status: 500
            })
        })
    })
}
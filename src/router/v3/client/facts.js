const { generateFact } = require('@controllers/generateFact')

module.exports = async fastify => {
    fastify.get('/facts/random', async reply => {
        reply.header('Content-Type', 'application/json')

        const randomFact = await generateFact()

        return reply.code(200).send({
            fact: randomFact.text,
            source: randomFact.source
        })
    })
}

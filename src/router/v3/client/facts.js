const { generateFact } = require('@controllers/generateFact');

module.exports = async (fastify, opts) => {

    fastify.get('/facts/random', async (request, reply) => {
        
        reply.header('Content-Type', 'application/json');

        let randomFact = await generateFact();

        return reply.code(200).send({
            fact: randomFact.text,
            source: randomFact.source
        })
    })
}
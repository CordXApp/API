module.exports = async (fastify, opts) => {

    fastify.get('/facts/random', async (request, reply) => {
        
        reply.header('Content-Type', 'application/json');

        let randomFact = await request.client.RandomFact;

        return reply.code(200).send({
            fact: randomFact.text,
            source: randomFact.source
        })
    })
}
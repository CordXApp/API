module.exports = async (fastify, opts) => {

    fastify.get('/yomomma', async (request, reply) => {
        
        reply.header('Content-Type', 'application/json');

        let random = await request.client.YoMommaJoke;

        return reply.code(200).send({
            joke: random
        })
    })
}
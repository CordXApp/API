module.exports = async (fastify, opts) => {

    fastify.get('/8ball', async (request, reply) => {
        
        reply.header('Content-Type', 'application/json');

        let response = await request.client.MagicBall;

        return reply.code(200).send({
            response: response
        })
    })
}
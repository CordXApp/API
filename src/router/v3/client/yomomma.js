const { genYoMamaJoke } = require('@controllers/genYoMamaJoke');

module.exports = async (fastify, opts) => {

    fastify.get('/yomomma', async (request, reply) => {
        
        reply.header('Content-Type', 'application/json');

        let random = await genYoMamaJoke();

        return reply.code(200).send({
            joke: random
        })
    })
}
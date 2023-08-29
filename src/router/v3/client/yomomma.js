const { genYoMamaJoke } = require('@controllers/genYoMamaJoke')

module.exports = async fastify => {
    fastify.get('/yomomma', async reply => {
        reply.header('Content-Type', 'application/json')

        const random = await genYoMamaJoke()

        return reply.code(200).send({
            joke: random
        })
    })
}

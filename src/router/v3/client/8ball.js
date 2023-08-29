const { generate8ballRes } = require('@controllers/generate8ballRes')

module.exports = async fastify => {
    fastify.get('/8ball', async reply => {
        reply.header('Content-Type', 'application/json')

        const response = await generate8ballRes()

        return reply.code(200).send({
            response: response
        })
    })
}

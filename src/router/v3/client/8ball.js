const logs = require('@plugins/logger')
const { generate8ballRes } = require('@controllers/generate8ballRes')

module.exports = async (fastify, opts) => {

    fastify.get('/8ball', async (request, reply) => {
        
        reply.header('Content-Type', 'application/json');

        let response = await generate8ballRes();

        return reply.code(200).send({
            response: response
        })
    })
}
module.exports = async fastify => {
    fastify.get('/', async (request, reply) => {
        return reply.status(200).send({
            message: 'Welcome to the CordX API. Make sure you check our docs for usage info: https:docs.cord.lol',
            error: false,
            fatal: false,
            status: 200
        })
    })
}

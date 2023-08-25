module.exports = async (fastify, opts) => {

    fastify.get('/fetch/:userId', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let u = request.params.userId;

        let user = await request.client.users.fetch(u);

        return reply.code(200).send({
            id: user.id,
            globalName: user.globalName,
            displayName: user.displayName,
            userName: user.username,
        })
    })
}

const config = require('@configs/main');

module.exports = async (fastify, opts) => {

    fastify.get('/summary', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        if (!request.query.secret) return reply.code(400).send({
            message: 'Please provide the required secret query',
            error: true,
            status: 400
        })

        if (request.query.secret !== config.status) return reply.code(400).send({
            message: 'Invalid secret provided.',
            error: true,
            status: 400
        })


        const response = await fetch('https://cordx.instatus.com/summary.json', {
            method: 'GET'
        });

        const data = await response.json();

        reply.code(200).send(data)
    })
}
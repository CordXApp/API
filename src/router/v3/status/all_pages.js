const config = require('@configs/main');

module.exports = async (fastify, opts) => {

    fastify.get('/pages/all/:secret', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        if (!request.params.secret) return reply.code(400).send({
            message: 'Please provide the required secret query',
            error: true,
            status: 400
        })

        if (request.params.secret !== config.status) return reply.code(400).send({
            message: 'Invalid secret provided.',
            error: true,
            status: 400
        })

        const response = await fetch('https://api.instatus.com/v2/pages', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${request.query.secret}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        res.code(200).send(data);
    })
}
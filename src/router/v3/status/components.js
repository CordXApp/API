const config = require('@configs/main');

module.exports = async (fastify, opts) => {
    fastify.get('/components', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        if (!req.query.secret) return reply.code(400).send({
            message: 'Please provide the required secret query',
            error: true,
            status: 400
        })

        if (req.query.secret !== config.status) return reply.code(400).send({
            message: 'Invalid secret provided.',
            error: true,
            status: 400
        })

        const response = await fetch('https://api.instatus.com/v2/ckq7ppm4g124913arohzh7jn9ek/components', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${req.query.secret}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        res.code(200).send(data);
    })
}
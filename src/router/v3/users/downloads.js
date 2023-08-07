const { sqlQuery } = require('@controllers/sqlQuery.js');
const config = require('@configs/main');
const logs = require('@plugins/logger');

module.exports = async (fastify, opts) => {

    fastify.get('/downloads/:userId/:secret', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let u = request.params.userId;
        let s = request.params.secret;

        if (!s || s !== config.api) return reply.code(400).send({
            message: 'Invalid user secret provided',
            error: true,
            status: 400
        })

        let downloads = await sqlQuery({ query: `SELECT * FROM downloads WHERE user="${u}"`})
        .then(d => d)
        .catch(e => logs.send(`ERROR: ${err.stack}`, 'error'));

        let down = downloads.filter((d) => !d.name.includes('.mp4'));

        return reply.code(200).send({
            downloads: down.splice(Math.floor(Math.random() * down.length), 9)
        })
    })
}
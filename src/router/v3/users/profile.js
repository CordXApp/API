const { sqlQuery } = require('@controllers/sqlQuery.js');
const config = require('@configs/main');
const logs = require('@plugins/logger')

module.exports = async (fastify, opts) => {

    fastify.get('/profile/:userId/:secret', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let u = request.params.userId;
        let s = request.params.secret;

        if (!s || s !== config.api) return reply.code(400).send({
            message: 'Invalid user secret provided',
            error: true,
            status: 400
        })

        let user = await sqlQuery({ query: `SELECT * FROM users WHERE folder="${u}"`})
        .then(u => u).catch(e => logs.send(`ERROR: ${err.stack}`, 'error'));

        return reply.code(200).send({
            user: user[0].userid,
            secret: user[0].secret,
            cookie: user[0].cookie,
            webhook: user[0].webhook
        })
    })
}

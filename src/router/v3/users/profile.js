const { sqlQuery } = require('@controllers/sqlQuery.js');
const logs = require('@plugins/logger')

module.exports = async (fastify, opts) => {

    fastify.get('/profile/:userId', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let u = request?.params?.userId;
        let s = request?.query?.secret;

        let user = await sqlQuery({ query: `SELECT * FROM users WHERE folder="${u}"`}).then((u) => u);

        if (!s || s !== user[0].secret) return reply.code(400).send({
            message: 'Invalid user secret provided',
            error: true,
            status: 400
        })

        return reply.code(200).send({
            user: user[0].userid
        })
    })
}
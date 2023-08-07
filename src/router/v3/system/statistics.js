const { sqlQuery } = require('@controllers/sqlQuery.js');
const logs = require('@plugins/logger')

module.exports = async (fastify, opts) => {

    fastify.get('/stats', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let users = await sqlQuery({ query: `SELECT * FROM users` })
        .then((u) => u.length)
        .catch((e) => logs.send(`ERROR: ${e.stack}`, 'error'))

        let images = await sqlQuery({ query: `SELECT * FROM images` })
        .then((i) => i.length)
        .catch((e) => logs.send(`ERROR: ${e.stack}`, 'error'))

        return reply.code(200).send({
            users: await sqlQuery({ query: `SELECT * FROM users` }).then((u) => u.length),
            images: await sqlQuery({ query: `SELECT * FROM images` }).then((i) => i.length),
            downloads: await sqlQuery({ query: `SELECT * FROM downloads` }).then((d) => d.length)
        })
    })
}
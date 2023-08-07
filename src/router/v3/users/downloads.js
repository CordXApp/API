const { sqlQuery } = require('@controllers/sqlQuery.js');
const logs = require('@plugins/logger')

module.exports = async (fastify, opts) => {

    fastify.get('/downloads/:userId', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let u = request?.params?.userId;

        let client = request?.client;

        let downloads = await sqlQuery({ query: `SELECT * FROM downloads WHERE user="${u}"`})
        .then(d => d)
        .catch(e => logs.send(`ERROR: ${err.stack}`, 'error'));

        let down = downloads.filter((d) => !d.name.includes('.mp4'));

        return reply.code(200).send({
            images: down.splice(Math.floor(Math.random() * down.length), 9)
        })
    })
}
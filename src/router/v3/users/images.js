const { sqlQuery } = require('@controllers/sqlQuery.js');
const logs = require('@plugins/logger')

module.exports = async (fastify, opts) => {

    fastify.get('/images/:userId', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let u = request?.params?.userId;
        let s = request?.query?.secret;

        let client = request?.client;

        let user = await sqlQuery({ query: `SELECT * FROM users WHERE folder="${u}"`}).then((u) => u);

        if (!s || s !== user[0].secret) return reply.code(400).send({
            message: 'Invalid user secret provided',
            error: true,
            status: 400
        })

        let images = await sqlQuery({ query: `SELECT * FROM images WHERE userid="${u}"`})
        .then(i => i)
        .catch(e => logs.send(`ERROR: ${err.stack}`, 'error'));

        let imgs = images.filter((i) => !i.filename.includes('.mp4'));

        return reply.code(200).send({
            images: imgs.splice(Math.floor(Math.random() * imgs.length), 9)
        })
    })
}
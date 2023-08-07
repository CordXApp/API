const { sqlQuery } = require('@controllers/sqlQuery.js');
const logs = require('@plugins/logger')

module.exports = async (fastify, opts) => {

    fastify.get('/videos/:userId', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let u = request?.params?.userId;

        let client = request?.client;

        let videos = await sqlQuery({ query: `SELECT * FROM images WHERE userid="${u}"`})
        .then(v => v)
        .catch(e => logs.send(`ERROR: ${err.stack}`, 'error'));

        let vids = videos.filter((v) => v.filename.includes('.mp4'));

        return reply.code(200).send({
            images: vids.splice(Math.floor(Math.random() * vids.length), 9)
        })
    })
}
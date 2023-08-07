const { sqlQuery } = require('@controllers/sqlQuery.js');
const config = require('@configs/main');
const logs = require('@plugins/logger')

module.exports = async (fastify, opts) => {

    fastify.get('/videos/:userId/:secret', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let u = request.params.userId;
        let s = request.params.secret;

        if (!s || s !== config.api) return reply.code(400).send({
            message: 'Invalid user secret provided',
            error: true,
            status: 400
        })

        let videos = await sqlQuery({ query: `SELECT * FROM images WHERE userid="${u}"`})
        .then(v => v)
        .catch(e => logs.send(`ERROR: ${err.stack}`, 'error'));

        let vids = videos.filter((v) => v.filename.includes('.mp4'));

        return reply.code(200).send({
            videos: vids.splice(Math.floor(Math.random() * vids.length), 9)
        })
    })
}
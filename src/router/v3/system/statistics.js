const { sqlQuery } = require('@controllers/sqlQuery.js')

module.exports = async fastify => {
    fastify.get('/stats', async reply => {
        reply.header('Content-Type', 'application/json')

        return reply.code(200).send({
            users: await sqlQuery({ query: 'SELECT * FROM users' }).then(u => u.length),
            images: await sqlQuery({ query: 'SELECT * FROM images' }).then(i => i.length),
            downloads: await sqlQuery({ query: 'SELECT * FROM downloads' }).then(d => d.length)
        })
    })
}

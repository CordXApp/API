const { version } = require('../../package.json')

module.exports = async fastify => {
    fastify.get('/', async (request, reply) => {
        return reply.status(200).send({
            message: 'Welcome to the CordX API.',
            documentation: 'https://help.cordx.lol/devs',
            version: `v${version}`
        })
    })
}

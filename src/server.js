const path = require('path')
const logs = require('@plugins/logger')
const config = require('@configs/main')

module.exports = async client => {

    const fastify = require('fastify')({ logger: true })

    fastify.register(require('@fastify/autoload'), {
        dir: path.join(__dirname, 'router')
    })

    fastify.addHook('preHandler', (req, res, done) => {
        req.client = client

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('X-Powered-By', 'Infinity Development');

        done()
    });

    fastify.setNotFoundHandler(function (request, reply) {
        reply.code(404).send({
            message: 'Unable to locate the provided route',
            error: true,
            fatal: false,
            status: 404
        })
    });

    const start = async () => {
        try {

            await fastify.listen({
                port: config.port,
                host: '0.0.0.0'
            });

            logs.send('Server start up successful', 'ready');
        } catch (e) {
            await logs.send('Error starting server', 'error');

            return fastify.log.error(e.stack);
        }
    }

    start()
}
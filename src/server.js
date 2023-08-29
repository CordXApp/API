const path = require('path')
const logs = require('@plugins/logger')
const config = require('@configs/main')
const { swaggerOptions } = require('@controllers/swaggerOptions')
const { corsOptions } = require('@controllers/corsOptions')
const rateLimit = require('fastify-rate-limit')

module.exports = async client => {
    const fastify = require('fastify')({ logger: false })
    fastify.register(require('fastify-swagger'), swaggerOptions)
    fastify.register(require('@fastify/cors'), corsOptions)
    fastify.register(rateLimit, {
        global: false,
        max: 10,
        timeWindow: 1000,
        hook: 'preHandler',
        cache: 5000,
        redis: client._cache,
        continueExceeding: false,
        skipOnError: false,
        addHeadersOnExceeding: {
            'x-ratelimit-limit': true,
            'x-ratelimit-remaining': true,
            'x-ratelimit-reset': true
        },
        addHeaders: {
            'x-ratelimit-limit': true,
            'x-ratelimit-remaining': true,
            'x-ratelimit-reset': true,
            'retry-after': true
        }
    })

    fastify.addHook('preHandler', (req, res, done) => {
        req.client = client

        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', '*')
        res.header('X-Powered-By', 'Infinity Development')

        done()
    })

    fastify.register(require('@fastify/autoload'), {
        dir: path.join(__dirname, 'router')
    })

    fastify.setNotFoundHandler(function (request, reply) {
        reply.code(404).send({
            message: 'Unable to locate the provided route',
            error: true,
            fatal: false,
            status: 404
        })
    })

    fastify.ready(err => {
        if (err) throw err
        fastify.swagger()
    })

    const start = async () => {
        try {
            await fastify.listen({
                port: config.port,
                host: '0.0.0.0'
            })

            logs.send('Server start up successful', 'ready')
        } catch (e) {
            await logs.send('Error starting server', 'error')
            return logs.send(`${e.stack}`, 'error')
        }
    }

    start()
}

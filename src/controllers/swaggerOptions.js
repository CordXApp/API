const { version } = require('../../package.json')

module.exports.swaggerOptions = {
    routePrefix: '/internal',
    exposeRoute: true,
    hideUntagged: true,
    swagger: {
        info: {
            title: 'CordX - Internal API Docs',
            description: 'Internal documentation for the cordx api.',
            version: `v${version}`
        },
        externalDocs: {
            url: 'https://docs.cordx.lol',
            description: 'View our external docs'
        },
        host: 'localhost:4985',
        basePath: '/v3',
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            {
                name: 'Users',
                description: 'User related end-points'
            }
        ]
    },
    uiConfig: {
        docsExpansion: 'full',
        deepLinking: false
    },
    uiHooks: {
        onRequest: function (request, reply, next) {
            next()
        },
        preHandler: function (request, reply, next) {
            next()
        }
    }
}

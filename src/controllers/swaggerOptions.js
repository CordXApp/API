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
        host: 'api.cordx.lol',
        basePath: '/v3',
        schemes: ['https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            {
                name: 'Client',
                description: 'Client/Discord Bot related end-points'
            },
            {
                name: 'Users',
                description: 'User related end-points'
            },
            {
                name: 'System',
                description: 'System related end-points'
            },
            {
                name: 'Status',
                description: 'Status page related end-points'
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

import { version } from '../package.json';

export const Options = {
    exposeRoute: true,
    routePrefix: '/internal',
    hideUntagged: true,
    addModels: true,
    openapi: '3.0.2',
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
        schemes: ['http', 'https'],
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
};

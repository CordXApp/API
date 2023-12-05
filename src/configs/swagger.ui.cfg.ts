import { version } from '../../package.json';

export const SwaggerUiOptions = {
    routePrefix: '/docs',
    theme: 'material',
    uiConfig: {
        docsExpansion: 'full',
        deepLinking: false
    },
    uiHooks: {
        onRequest: function (request, reply, next) { next() },
        preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
};

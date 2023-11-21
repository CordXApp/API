const { sqlQuery } = require('@controllers/sqlQuery.js')

module.exports = async function (fastify) {
    fastify.route({
        url: '/list',
        method: ['GET'],
        schema: {
            summary: 'View our website/system statistics',
            description: 'Returns an object containing things like our total image count',
            tags: ['System'],
            response: {
                200: {
                    description: 'Successful request',
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        globalName: { type: 'string' },
                        displayName: { type: 'string' },
                        userName: { type: 'string' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')
            const partners = await sqlQuery({ query: 'SELECT * FROM partners' }).then(p => p)

            if (!partners) {
                return reply.code(404).send({
                    code: 'NOT_FOUND',
                    message: 'Looks like there is nothing to see here yet',
                    status: 404
                })
            }

            const list = await partners.map(p => p)

            return reply.code(200).send(JSON.stringify(list))
        }
    })
}

module.exports = async function (fastify) {
    fastify.route({
        url: '/summary',
        method: ['GET'],
        schema: {
            summary: 'View our current system status',
            description: 'Returns some information regarding our system status and status page url',
            tags: ['Status'],
            response: {
                200: {
                    description: 'Successful request',
                    type: 'object',
                    properties: {
                        page: {
                            name: {
                                type: 'string',
                                default: 'CordX',
                                description: 'Will always be the CordX'
                            },
                            url: {
                                type: 'string',
                                default: 'https://cordx.instatus.com',
                                description: 'Url will always be cordx.instatus.com'
                            },
                            status: { type: 'string' }
                        }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')

            const response = await fetch('https://cordx.instatus.com/summary.json')

            const data = await response.json()

            reply.code(200).send(data)
        }
    })
}

const { sqlQuery } = require('@controllers/sqlQuery.js')

module.exports = async function (fastify) {
    fastify.route({
        url: '/stats',
        method: ['GET'],
        config: {
            rateLimit: {
                max: 1000,
                timeWindow: 3600000,
                errorResponseBuilder: function () {
                    return {
                        code: 429,
                        error: 'Enhance your calm',
                        message: `Rate limited, please try again in: ${this.timeWindow}ms`,
                        date: Date.now(),
                        expiresIn: this.timeWindow
                    }
                },
                onExceeding: function () {
                    return {
                        code: 429,
                        error: 'Enhance your calm',
                        message: `Rate limited, please try again in: ${this.timeWindow}ms`,
                        date: Date.now(),
                        expiresIn: this.timeWindow
                    }
                },
                onExceeded: function () {
                    return {
                        code: 420,
                        error: 'Enhance your calm',
                        message: `Whoops, looks like you have been rate limited. Please wait: ${this.timeWindow}ms`,
                        date: Date.now(),
                        expiresIn: this.timeWindow
                    }
                }
            }
        },
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
                },
                206: {
                    description: 'Partial/Cached content',
                    type: 'object',
                    properties: {
                        cached: {
                            type: 'boolean',
                            default: true,
                            description: 'Will always be true'
                        },
                        expiry: {
                            type: 'number',
                            default: 1800,
                            description: '30 minutes'
                        },
                        data: {
                            type: 'object',
                            properties: {
                                users: {
                                    type: 'number',
                                    default: 0
                                },
                                images: {
                                    type: 'number',
                                    default: 0
                                },
                                downloads: {
                                    type: 'number',
                                    default: 0
                                }
                            }
                        }
                    }
                },
                429: {
                    description: 'Rate limited',
                    type: 'object',
                    properties: {
                        code: { type: 'number' },
                        error: { type: 'string' },
                        message: { type: 'string' },
                        date: { type: 'string' },
                        expiresIn: { type: 'number' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')

            const cached = await request.client._cache.get('system_stats')
            const parsed = await JSON.parse(cached)

            if (cached) {
                reply.code(206).send(
                    JSON.stringify({
                        cached: true,
                        expires: 1800,
                        data: {
                            users: parsed.users,
                            images: parsed.images,
                            downloads: parsed.downloads
                        }
                    })
                )
            } else {
                const output = {
                    users: await sqlQuery({ query: 'SELECT * FROM users' }).then(u => u.length),
                    images: await sqlQuery({ query: 'SELECT * FROM images' }).then(i => i.length),
                    downloads: await sqlQuery({ query: 'SELECT * FROM downloads' }).then(d => d.length)
                }

                request.client._cache
                    .set('system_stats', JSON.stringify(output), 'EX', 1800)
                    .then(() => console.log('System stats cached for 30 minutes'))
                    .catch(e => console.error(`Failed caching system stats | Error: ${e.stack}`))

                return reply.code(200).send(JSON.stringify(output))
            }
        }
    })
}

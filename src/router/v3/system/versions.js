const { sendGithubRequest } = require('@plugins/requests/rawGitRequest')

module.exports = async function (fastify) {
    fastify.route({
        url: '/check/versions',
        method: ['GET'],
        config: {
            rateLimit: {
                max: 50,
                timeWindow: 10000,
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
                        current: {
                            type: 'object',
                            properties: {
                                api: { type: 'string' },
                                client: { type: 'string' },
                                website: { type: 'string' }
                            }
                        },
                        newest: {
                            type: 'object',
                            properties: {
                                api: { type: 'string' },
                                client: { type: 'string' },
                                website: { type: 'string' }
                            }
                        },
                        stable: {
                            type: 'object',
                            properties: {
                                api: { type: 'string' },
                                client: { type: 'string' },
                                website: { type: 'string' }
                            }
                        }
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
                                current: {
                                    type: 'object',
                                    properties: {
                                        api: { type: 'string' },
                                        client: { type: 'string' },
                                        website: { type: 'string' }
                                    }
                                },
                                newest: {
                                    type: 'object',
                                    properties: {
                                        api: { type: 'string' },
                                        client: { type: 'string' },
                                        website: { type: 'string' }
                                    }
                                },
                                stable: {
                                    type: 'object',
                                    properties: {
                                        api: { type: 'string' },
                                        client: { type: 'string' },
                                        website: { type: 'string' }
                                    }
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

            const cached = await request.client._cache.get('system_versions')
            const parsed = await JSON.parse(cached)

            if (cached) {
                reply.code(206).send(
                    JSON.stringify({
                        cached: true,
                        expires: 1800,
                        data: {
                            current: {
                                api: parsed.current.api,
                                client: parsed.current.client,
                                website: parsed.current.website
                            },
                            newest: {
                                api: parsed.newest.api,
                                client: parsed.newest.client,
                                website: parsed.newest.website
                            },
                            stable: {
                                api: parsed.stable.api,
                                client: parsed.stable.client,
                                website: parsed.stable.website
                            }
                        }
                    })
                )
            } else {
                const output = {
                    current: {
                        api: `v${await sendGithubRequest({
                            repo: 'CordXApp/OldWebsite',
                            branch: 'master',
                            path: 'package.json'
                        })}`,
                        client: `v${await sendGithubRequest({
                            repo: 'CordXApp/Client',
                            branch: 'master',
                            path: 'package.json'
                        })}`,
                        website: `v${await sendGithubRequest({
                            repo: 'CordXApp/OldWebsite',
                            branch: 'master',
                            path: 'package.json'
                        })}`
                    },
                    newest: {
                        api: `v${await sendGithubRequest({
                            repo: 'CordXApp/API',
                            branch: 'master',
                            path: 'package.json'
                        })}`,
                        client: `v${await sendGithubRequest({
                            repo: 'CordXApp/Client',
                            branch: 'master',
                            path: 'package.json'
                        })}`,
                        website: `v${await sendGithubRequest({
                            repo: 'CordXApp/Website',
                            branch: 'master',
                            path: 'package.json'
                        })}`
                    },
                    stable: {
                        api: `v${await sendGithubRequest({
                            repo: 'CordXApp/API',
                            branch: 'master',
                            path: 'package.json'
                        })}`,
                        client: `v${await sendGithubRequest({
                            repo: 'CordXApp/Client',
                            branch: 'master',
                            path: 'package.json'
                        })}`,
                        website: `v${await sendGithubRequest({
                            repo: 'CordXApp/Beta',
                            branch: 'master',
                            path: 'package.json'
                        })}`
                    }
                }

                request.client._cache
                    .set('system_versions', JSON.stringify(output), 'EX', 1800)
                    .then(() => console.log('System versions cached for 30 minutes'))
                    .catch(e => console.error(`Failed caching system stats | Error: ${e.stack}`))

                return reply.code(200).send(JSON.stringify(output))
            }
        }
    })
}

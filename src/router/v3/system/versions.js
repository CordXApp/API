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
        handler: async reply => {
            reply.header('Content-Type', 'application/json')

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
                        branch: 'beta',
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
                        branch: 'prod',
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

            return reply.code(200).send(JSON.stringify(output))
        }
    })
}

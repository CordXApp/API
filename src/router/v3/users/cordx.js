module.exports = async function (fastify) {
    fastify.route({
        url: '/fetch/:userId',
        method: ['GET'],
        config: {
            rateLimit: {
                max: 100,
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
            summary: "Get a CordX user's Discord Profile",
            description: "Returns a given cordx user's discord id, global name etc",
            tags: ['Users'],
            params: {
                type: 'object',
                properties: {
                    userId: {
                        type: 'string',
                        description: 'A valid discord user id/snowflake'
                    }
                }
            },
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
                404: {
                    description: 'User not found',
                    type: 'object',
                    properties: {
                        code: { type: 'string' },
                        message: { type: 'string' },
                        status: { type: 'number' }
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
        preHandler: async (request, reply) => {
            const { userId } = request.params
            const cordx_user = await request.client.users.fetch(userId)

            if (!cordx_user) {
                return reply.code(404).send({
                    code: 'USER_NOT_FOUND',
                    message: `Our discord client searched far and wide but was unable to locate a user with the ID: ${userId}. If needed you can use the #{/v3/users/discord/:userId} route to fetch a user using the discord api!`,
                    status: 404
                })
            }

            if (!userId) {
                reply.code(404).send({
                    code: 'USER_NOT_FOUND',
                    message: `The provided user ${userId} was not found!`,
                    status: 404
                })
                return null
            }
        },
        handler: async (request, reply) => {
            const user = request.params.userId

            const cordx_user = await request.client.users.fetch(user)

            return reply.code(200).send({
                id: cordx_user.id,
                globalName: cordx_user.globalName,
                displayName: cordx_user.displayName,
                userName: cordx_user.username
            })
        }
    })
}

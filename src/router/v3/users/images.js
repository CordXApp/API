const { S3, ListObjectsCommand } = require('@aws-sdk/client-s3')

module.exports = async function (fastify) {
    fastify.route({
        url: '/:userId/images/all',
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
            summary: "Get a user's images",
            description: 'Returns an array of 9 images at time',
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
                        images: {
                            type: 'array',
                            properties: {}
                        }
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
            reply.header('Content-Type', 'application/json')

            const { userId } = request.params

            const space = new S3({
                forcePathStyle: false,
                endpoint: process.env.DoCdnLink,
                region: 'us-east-1',
                credentials: {
                    accessKeyId: process.env.DoKeyId,
                    secretAccessKey: process.env.DoSecret
                }
            })

            const bucket = await space.send(new ListObjectsCommand({ Bucket: 'cordx-bucket' }))
            const u_bucket = await bucket.Contents.filter(u => u.Key.startsWith(`${userId}`) && !u.Key.includes('.mp4'))

            if (!bucket) {
                return reply.code(404).send({
                    message: 'Bucket not found',
                    status: 404
                })
            }

            return reply.code(200).send({
                images: u_bucket.splice(Math.floor(Math.random() * u_bucket.length), 9)
            })
        }
    })
}

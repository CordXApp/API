const { formatSizeUnits } = require('@controllers/formatSizeUnits')
const { S3, ListObjectsCommand } = require('@aws-sdk/client-s3')
const { sqlQuery } = require('@controllers/sqlQuery.js')

module.exports = async function (fastify) {
    fastify.route({
        url: '/:userId/stats',
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
            summary: "Get a user's upload stats",
            description: 'Returns an object containing some basic statistics',
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
                        storage: {
                            type: 'object',
                            properties: {
                                used: { type: 'number' },
                                remains: {
                                    type: 'string',
                                    default: 'unlimited'
                                }
                            }
                        },
                        files: {
                            type: 'object',
                            properties: {
                                images: { type: 'number' },
                                downloads: { type: 'number' },
                                png: { type: 'number' },
                                gif: { type: 'number' },
                                mp4: { type: 'number' },
                                other: { type: 'number' }
                            }
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

            const images = await sqlQuery({ query: `SELECT * FROM images WHERE userid="${userId}"` }).then(i => i)
            const downloads = await sqlQuery({ query: `SELECT * FROM downloads WHERE user="${userId}"` }).then(d => d)

            const png = await images.filter(v => v.filename.includes('.png'))
            const gif = await images.filter(v => v.filename.includes('.gif'))
            const mp4 = await images.filter(v => v.filename.includes('.mp4'))
            const other = await images.filter(
                v => !v.filename.includes('.png') && !v.filename.includes('.gif') && !v.filename.includes('.mp4')
            )

            const bucket = await space.send(new ListObjectsCommand({ Bucket: 'cordx', Key: `${userId}` }))

            let size

            if (bucket) size = await formatSizeUnits({ bytes: bucket.Contents.length })
            else size = '0 bytes'

            const data = {
                storage: {
                    used: `${size}`,
                    remains: 'unlimited'
                },
                files: {
                    images: images.length ? images.length : 0,
                    downloads: downloads.length ? downloads.length : 0,
                    png: png.length ? png.length : 0,
                    gif: gif.length ? gif.length : 0,
                    mp4: mp4.length ? mp4.length : 0,
                    other: other.length ? other.length : 0
                }
            }

            return reply.code(200).send(JSON.stringify(data))
        }
    })
}

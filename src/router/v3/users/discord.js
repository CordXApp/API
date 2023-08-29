const config = require('@configs/main')
const { snowflakeToDate } = require('@controllers/convertSnowflake')

module.exports = async function (fastify) {
    fastify.route({
        url: '/discord/:userId',
        method: ['GET'],
        config: {
            rateLimit: {
                max: 3,
                timeWindow: 1000,
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
            summary: "Get a user's public discord information",
            description: "Returns the provided user's information from the discord api",
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
                        created_at: { type: 'string' },
                        username: { type: 'string' },
                        global_name: { type: 'string' },
                        badges: { type: 'object' },
                        avatar: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                link: { type: 'string' },
                                is_animated: { type: 'boolean' }
                            }
                        },
                        banner: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                link: { type: 'string' },
                                is_animated: { type: 'boolean' },
                                color: { type: 'string' }
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
                                id: { type: 'string' },
                                username: { type: 'string' },
                                global_name: { type: 'string' },
                                avatar: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'string' },
                                        link: { type: 'string' },
                                        is_animated: { type: 'boolean' }
                                    }
                                },
                                banner: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'string' },
                                        link: { type: 'string' },
                                        is_animated: { type: 'boolean' },
                                        color: { type: 'string' }
                                    }
                                }
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

            const test = await fetch(`https://canary.discord.com/api/v10/users/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bot ${config.token}`
                }
            })

            if (test.status >= 429) return reply.code(429)
            if (test.status >= 427) return reply.code(429)

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
            try {
                const { userId } = request.params
                const cached = await request.client._cache.get(`discord_${userId}`)
                const parsed = await JSON.parse(cached)

                if (cached) {
                    reply.code(206).send(
                        JSON.stringify({
                            cached: true,
                            expiry: 1800,
                            data: {
                                id: parsed.id,
                                created_at: parsed.created_at,
                                username:
                                    parseInt(parsed.discriminator) > 0
                                        ? `${parsed.username}#${parsed.discriminator}`
                                        : parsed.username,
                                global_name: parsed.global_name,
                                avatar: parsed.avatar,
                                banner: parsed.banner
                            }
                        })
                    )
                } else {
                    await fetch(`https://canary.discord.com/api/v10/users/${userId}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bot ${config.token}`
                        }
                    })
                        .then(res => res.json())
                        .then(user => {
                            let avatarLink = null

                            if (user.avatar) avatarLink = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`

                            let bannerLink = null
                            if (user.banner) bannerLink = `https://cdn.discordapp.com/banners/${user.id}/${user.banner}`

                            const output = {
                                id: user.id,
                                created_at: snowflakeToDate({ snowflake: user.id }),
                                username:
                                    parseInt(user.discriminator) > 0
                                        ? `${user.username}#${user.discriminator}`
                                        : user.username,
                                global_name: user.global_name,
                                avatar: {
                                    id: user.avatar,
                                    link: avatarLink,
                                    is_animated: user.avatar !== null && user.avatar.startsWith('a_') ? true : false
                                },
                                banner: {
                                    id: user.banner,
                                    link: bannerLink,
                                    is_animated: user.banner !== null && user.banner.startsWith('a_') ? true : false,
                                    color: user.banner_color
                                }
                            }

                            request.client._cache
                                .set(`discord_${userId}`, JSON.stringify(output), 'EX', 1800)
                                .then(() => {
                                    console.log(`User: ${userId} cached for 30 minutes`)
                                })
                                .catch(e => {
                                    console.error(`Failed caching user: ${userId} | Error: ${e.stack}`)
                                })

                            return reply.code(200).send(JSON.stringify(output))
                        })
                }
            } catch (err) {
                await console.error(err.stack)

                return reply.code(500).send({
                    code: 'REQUEST_ERROR',
                    message: 'request failed with a internal error',
                    error: `${err.message}`,
                    status: 500
                })
            }
        }
    })
}

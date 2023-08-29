const { generateMeme } = require('@controllers/generateMeme')

module.exports = async fastify => {
    fastify.route({
        url: '/memes',
        method: ['GET'],
        schema: {
            summary: 'Random meme.',
            description: 'Generates a random meme.',
            tags: ['Client'],
            response: {
                200: {
                    description: 'Successful request',
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        image: { type: 'string' },
                        link: { type: 'string' },
                        author: { type: 'string' },
                        upvotes: { type: 'number' },
                        comments: { type: 'number' },
                        nsfw: { type: 'boolean' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')

            const meme = await generateMeme({ topic: 'memes' })

            return reply.code(200).send({
                title: meme.title,
                image: meme.url,
                link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
                author: meme.author,
                upvotes: meme.ups,
                comments: meme.num_comments,
                nsfw: meme.over_18
            })
        }
    })

    fastify.route({
        url: '/memes/dank',
        method: ['GET'],
        schema: {
            summary: 'Random dank meme.',
            description: 'Generates a random dank meme.',
            tags: ['Client'],
            response: {
                200: {
                    description: 'Successful request',
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        image: { type: 'string' },
                        link: { type: 'string' },
                        author: { type: 'string' },
                        upvotes: { type: 'number' },
                        comments: { type: 'number' },
                        nsfw: { type: 'boolean' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')

            const meme = await generateMeme({ topic: 'dank' })

            return reply.code(200).send({
                title: meme.title,
                image: meme.url,
                link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
                author: meme.author,
                upvotes: meme.ups,
                comments: meme.num_comments,
                nsfw: meme.over_18
            })
        }
    })

    fastify.route({
        url: '/memes/danker',
        method: ['GET'],
        schema: {
            summary: 'Random danker meme.',
            description: 'Generates a random danker meme.',
            tags: ['Client'],
            response: {
                200: {
                    description: 'Successful request',
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        image: { type: 'string' },
                        link: { type: 'string' },
                        author: { type: 'string' },
                        upvotes: { type: 'number' },
                        comments: { type: 'number' },
                        nsfw: { type: 'boolean' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')

            const meme = await generateMeme({ topic: 'dankmemes' })

            return reply.code(200).send({
                title: meme.title,
                image: meme.url,
                link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
                author: meme.author,
                upvotes: meme.ups,
                comments: meme.num_comments,
                nsfw: meme.over_18
            })
        }
    })

    fastify.route({
        url: '/memes/prequel',
        method: ['GET'],
        schema: {
            summary: 'Random prequel meme.',
            description: 'Generates a random prequel meme.',
            tags: ['Client'],
            response: {
                200: {
                    description: 'Successful request',
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        image: { type: 'string' },
                        link: { type: 'string' },
                        author: { type: 'string' },
                        upvotes: { type: 'number' },
                        comments: { type: 'number' },
                        nsfw: { type: 'boolean' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')

            const meme = await generateMeme({ topic: 'prequelmemes' })

            return reply.code(200).send({
                title: meme.title,
                image: meme.url,
                link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
                author: meme.author,
                upvotes: meme.ups,
                comments: meme.num_comments,
                nsfw: meme.over_18
            })
        }
    })

    fastify.route({
        url: '/memes/facebook',
        method: ['GET'],
        schema: {
            summary: 'Random facebook meme.',
            description: 'Generates a random facebook meme.',
            tags: ['Client'],
            response: {
                200: {
                    description: 'Successful request',
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        image: { type: 'string' },
                        link: { type: 'string' },
                        author: { type: 'string' },
                        upvotes: { type: 'number' },
                        comments: { type: 'number' },
                        nsfw: { type: 'boolean' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')

            const meme = await generateMeme({ topic: 'terriblefacebookmemes' })

            return reply.code(200).send({
                title: meme.title,
                image: meme.url,
                link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
                author: meme.author,
                upvotes: meme.ups,
                comments: meme.num_comments,
                nsfw: meme.over_18
            })
        }
    })

    fastify.route({
        url: '/memes/wholesome',
        method: ['GET'],
        schema: {
            summary: 'Random wholesome meme.',
            description: 'Generates a random wholesome meme.',
            tags: ['Client'],
            response: {
                200: {
                    description: 'Successful request',
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        image: { type: 'string' },
                        link: { type: 'string' },
                        author: { type: 'string' },
                        upvotes: { type: 'number' },
                        comments: { type: 'number' },
                        nsfw: { type: 'boolean' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')

            const meme = await generateMeme({ topic: 'wholesomememes' })

            return reply.code(200).send({
                title: meme.title,
                image: meme.url,
                link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
                author: meme.author,
                upvotes: meme.ups,
                comments: meme.num_comments,
                nsfw: meme.over_18
            })
        }
    })

    fastify.route({
        url: '/memes/deepfried',
        method: ['GET'],
        schema: {
            summary: 'Random deepfried meme.',
            description: 'Generates a random deepfried meme.',
            tags: ['Client'],
            response: {
                200: {
                    description: 'Successful request',
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        image: { type: 'string' },
                        link: { type: 'string' },
                        author: { type: 'string' },
                        upvotes: { type: 'number' },
                        comments: { type: 'number' },
                        nsfw: { type: 'boolean' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')

            const meme = await generateMeme({ topic: 'deepfriedmemes' })

            return reply.code(200).send({
                title: meme.title,
                image: meme.url,
                link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
                author: meme.author,
                upvotes: meme.ups,
                comments: meme.num_comments,
                nsfw: meme.over_18
            })
        }
    })

    fastify.route({
        url: '/memes/surreal',
        method: ['GET'],
        schema: {
            summary: 'Random surreal meme.',
            description: 'Generates a random surreal meme.',
            tags: ['Client'],
            response: {
                200: {
                    description: 'Successful request',
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        image: { type: 'string' },
                        link: { type: 'string' },
                        author: { type: 'string' },
                        upvotes: { type: 'number' },
                        comments: { type: 'number' },
                        nsfw: { type: 'boolean' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')

            const meme = await generateMeme({ topic: 'surrealmemes' })

            return reply.code(200).send({
                title: meme.title,
                image: meme.url,
                link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
                author: meme.author,
                upvotes: meme.ups,
                comments: meme.num_comments,
                nsfw: meme.over_18
            })
        }
    })

    fastify.route({
        url: '/memes/funny',
        method: ['GET'],
        schema: {
            summary: 'Random funny meme.',
            description: 'Generates a random funny meme.',
            tags: ['Client'],
            response: {
                200: {
                    description: 'Successful request',
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        image: { type: 'string' },
                        link: { type: 'string' },
                        author: { type: 'string' },
                        upvotes: { type: 'number' },
                        comments: { type: 'number' },
                        nsfw: { type: 'boolean' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')

            const meme = await generateMeme({ topic: 'funny' })

            return reply.code(200).send({
                title: meme.title,
                image: meme.url,
                link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
                author: meme.author,
                upvotes: meme.ups,
                comments: meme.num_comments,
                nsfw: meme.over_18
            })
        }
    })

    fastify.route({
        url: '/memes/last',
        method: ['GET'],
        schema: {
            summary: 'Random last meme.',
            description: 'Generates a random last meme.',
            tags: ['Client'],
            response: {
                200: {
                    description: 'Successful request',
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        image: { type: 'string' },
                        link: { type: 'string' },
                        author: { type: 'string' },
                        upvotes: { type: 'number' },
                        comments: { type: 'number' },
                        nsfw: { type: 'boolean' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')

            const meme = await generateMeme({ topic: 'lastimages' })

            return reply.code(200).send({
                title: meme.title,
                image: meme.url,
                link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
                author: meme.author,
                upvotes: meme.ups,
                comments: meme.num_comments,
                nsfw: meme.over_18
            })
        }
    })

    fastify.route({
        url: '/memes/economy',
        method: ['GET'],
        schema: {
            summary: 'Random economy meme.',
            description: 'Generates a random economy meme.',
            tags: ['Client'],
            response: {
                200: {
                    description: 'Successful request',
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        image: { type: 'string' },
                        link: { type: 'string' },
                        author: { type: 'string' },
                        upvotes: { type: 'number' },
                        comments: { type: 'number' },
                        nsfw: { type: 'boolean' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')

            const meme = await generateMeme({ topic: 'memeeconomy' })

            return reply.code(200).send({
                title: meme.title,
                image: meme.url,
                link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
                author: meme.author,
                upvotes: meme.ups,
                comments: meme.num_comments,
                nsfw: meme.over_18
            })
        }
    })

    fastify.route({
        url: '/memes/cats',
        method: ['GET'],
        schema: {
            summary: 'Random cats meme.',
            description: 'Generates a random cats meme.',
            tags: ['Client'],
            response: {
                200: {
                    description: 'Successful request',
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        image: { type: 'string' },
                        link: { type: 'string' },
                        author: { type: 'string' },
                        upvotes: { type: 'number' },
                        comments: { type: 'number' },
                        nsfw: { type: 'boolean' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')

            const meme = await generateMeme({ topic: 'cats' })

            return reply.code(200).send({
                title: meme.title,
                image: meme.url,
                link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
                author: meme.author,
                upvotes: meme.ups,
                comments: meme.num_comments,
                nsfw: meme.over_18
            })
        }
    })

    fastify.route({
        url: '/memes/dogs',
        method: ['GET'],
        schema: {
            summary: 'Random dogs meme.',
            description: 'Generates a random dogs meme.',
            tags: ['Client'],
            response: {
                200: {
                    description: 'Successful request',
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        image: { type: 'string' },
                        link: { type: 'string' },
                        author: { type: 'string' },
                        upvotes: { type: 'number' },
                        comments: { type: 'number' },
                        nsfw: { type: 'boolean' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')

            const meme = await generateMeme({ topic: 'dogs' })

            return reply.code(200).send({
                title: meme.title,
                image: meme.url,
                link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
                author: meme.author,
                upvotes: meme.ups,
                comments: meme.num_comments,
                nsfw: meme.over_18
            })
        }
    })
}

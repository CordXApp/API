const config = require('@configs/main')

module.exports = async function (fastify) {
    fastify.route({
        url: '/comp/filter/:secret',
        method: ['GET'],
        schema: {
            summary: 'Filter through our status page components',
            description: 'Restricted Endpoint | CordX Owners Only',
            tags: ['Status'],
            params: {
                type: 'object',
                properties: {
                    secret: {
                        type: 'string',
                        description: 'Our system status secret assigned to our owners.'
                    }
                }
            },
            response: {
                200: {
                    description: 'Successful request',
                    type: 'array',
                    properties: {}
                },
                401: {
                    description: 'Unauthorized',
                    type: 'object',
                    properties: {
                        code: { type: 'string' },
                        message: { type: 'string' },
                        status: { type: 'string' }
                    }
                }
            }
        },
        preHandler: async (request, reply) => {
            const { secret } = request.params

            if (!secret) {
                reply.code(401).send({
                    code: 'NO_SECRET_PROVIDED',
                    message: 'please provide the valid status secret',
                    status: 404
                })

                return null
            }

            if (secret !== config.status) {
                reply.code(401).send({
                    code: 'INVALID_SECRET_PROVIDED',
                    message: 'you provided an invalid secret for this endpoint',
                    status: 404
                })

                return null
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')

            switch (request.query.method) {
                case 'dns':
                    if (!request.params.secret) {
                        return reply.code(400).send({
                            message: 'Please provide the required secret query',
                            error: true,
                            status: 400
                        })
                    }

                    if (request.params.secret !== config.status) {
                        return reply.code(400).send({
                            message: 'Invalid secret provided.',
                            error: true,
                            status: 400
                        })
                    }

                    const dnsRes = await fetch(
                        'https://api.instatus.com/v2/ckq7ppm4g124913arohzh7jn9ek/components/ckq7pvha4166661arohq6spoouc',
                        {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${request.params.secret}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    )

                    const dnsComp = await dnsRes.json()

                    return reply.code(200).send(dnsComp.children)

                case 'sl':
                    if (!request.params.secret) {
                        return reply.code(400).send({
                            message: 'Please provide the required secret query',
                            error: true,
                            status: 400
                        })
                    }

                    if (request.params.secret !== config.status) {
                        return reply.code(400).send({
                            message: 'Invalid secret provided.',
                            error: true,
                            status: 400
                        })
                    }

                    const slRes = await fetch(
                        'https://api.instatus.com/v2/ckq7ppm4g124913arohzh7jn9ek/components/cl0tf533o2439948nmy2jusdnsa',
                        {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${request.params.secret}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    )

                    const slComp = await slRes.json()

                    return reply.code(200).send(slComp.children)

                case 'tp':
                    if (!request.params.secret) {
                        return reply.code(400).send({
                            message: 'Please provide the required secret query',
                            error: true,
                            status: 400
                        })
                    }

                    if (request.params.secret !== config.status) {
                        return reply.code(400).send({
                            message: 'Invalid secret provided.',
                            error: true,
                            status: 400
                        })
                    }

                    const tpRes = await fetch(
                        'https://api.instatus.com/v2/ckq7ppm4g124913arohzh7jn9ek/components/clbk4161511292htn2qmn90tah',
                        {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${request.params.secret}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    )

                    const tpComp = await tpRes.json()

                    return reply.code(200).send(tpComp.children)

                case 'us':
                    if (!request.params.secret) {
                        return reply.code(400).send({
                            message: 'Please provide the required secret query',
                            error: true,
                            status: 400
                        })
                    }

                    if (request.params.secret !== config.status) {
                        return reply.code(400).send({
                            message: 'Invalid secret provided.',
                            error: true,
                            status: 400
                        })
                    }

                    const usRes = await fetch(
                        'https://api.instatus.com/v2/ckq7ppm4g124913arohzh7jn9ek/components/ckq7pzhr7193192aroh4lijqoec',
                        {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${request.params.secret}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    )

                    const usComp = await usRes.json()

                    return reply.code(200).send(usComp.children)

                case 'web':
                    if (!request.params.secret) {
                        return reply.code(400).send({
                            message: 'Please provide the required secret query',
                            error: true,
                            status: 400
                        })
                    }

                    if (request.params.secret !== config.status) {
                        return reply.code(400).send({
                            message: 'Invalid secret provided.',
                            error: true,
                            status: 400
                        })
                    }

                    const webRes = await fetch(
                        'https://api.instatus.com/v2/ckq7ppm4g124913arohzh7jn9ek/components/clbk47q6j13842i6n23qm6f0tu',
                        {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${request.params.secret}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    )

                    const webComp = await webRes.json()

                    return reply.code(200).send(webComp.children)

                default:
                    return reply.code(400).send({
                        message: 'Invalid method query provided',
                        required: 'One of: ["dns", "sl", "tp", "us", "web"]',
                        error: true,
                        status: 400
                    })
            }
        }
    })
}

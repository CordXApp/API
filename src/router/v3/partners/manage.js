const { sqlQuery } = require('@controllers/sqlQuery.js')

module.exports = async function (fastify) {
    fastify.route({
        url: '/manage',
        method: ['POST'],
        schema: {
            summary: 'Add someone to our partners list',
            description: 'Manage our partners (owners only)',
            tags: ['System'],
            response: {
                200: {
                    description: 'Successful request',
                    type: 'object',
                    properties: {
                        code: { type: 'string' },
                        message: { type: 'string' },
                        status: { type: 'string' }
                    }
                },
                400: {
                    description: 'Malformed request',
                    type: 'object',
                    properties: {
                        code: { type: 'string' },
                        message: { type: 'string' },
                        errormsg: { type: 'string' },
                        status: { type: 'string' }
                    }
                },
                401: {
                    description: 'Unauthorized',
                    type: 'object',
                    properties: {
                        code: { type: 'string' },
                        message: { type: 'string' },
                        errormsg: { type: 'string' },
                        status: { type: 'string' }
                    }
                }
            },
            body: {
                type: 'object',
                properties: {
                    title: { type: 'string' },
                    image: { type: 'string' },
                    bio: { type: 'string' },
                    url: { type: 'string' },
                    social: { type: 'string' },
                    Authorization: { type: 'string' },
                    Method: { type: 'string' }
                }
            }
        },
        preHandler: async (request, reply) => {
            if (!request.body) {
                return reply.code(400).send({
                    code: 'MALFORMED_REQUEST',
                    message: 'Invalid or missing body',
                    errormsg: 'please provide a valid urlencoded body',
                    status: 400
                })
            }

            if (!request.body.title && request.body.Method !== 'delete') {
                return reply.code(400).send({
                    code: 'MALFORMED_REQUEST',
                    message: 'Invalid body provided',
                    errormsg: 'please provide a valid urlencoded body',
                    status: 400
                })
            }

            if (!request.body.image && request.body.Method !== 'delete') {
                return reply.code(400).send({
                    code: 'MALFORMED_REQUEST',
                    message: 'Invalid body provided',
                    errormsg: 'please provide a valid urlencoded body',
                    status: 400
                })
            }

            if (!request.body.bio && request.body.Method !== 'delete') {
                return reply.code(400).send({
                    code: 'MALFORMED_REQUEST',
                    message: 'Invalid body provided',
                    errormsg: 'please provide a valid urlencoded body',
                    status: 400
                })
            }

            if (!request.body.url && request.body.Method !== 'delete') {
                return reply.code(400).send({
                    code: 'MALFORMED_REQUEST',
                    message: 'Invalid body provided',
                    errormsg: 'please provide a valid urlencoded body',
                    status: 400
                })
            }

            if (!request.body.social && request.body.Method !== 'delete') {
                return reply.code(400).send({
                    code: 'MALFORMED_REQUEST',
                    message: 'Invalid body provided',
                    errormsg: 'please provide a valid urlencoded body',
                    status: 400
                })
            }

            if (!request.body.Authorization) {
                return reply.code(400).send({
                    code: 'MALFORMED_REQUEST',
                    message: 'Invalid body provided',
                    errormsg: 'please provide a valid urlencoded body',
                    status: 400
                })
            }

            if (request.body.Authorization !== process.env.API_SECRET) {
                return reply.code(401).send({
                    code: 'UNAUTHORIZED',
                    message: 'Invalid api token',
                    errormsg: 'please provide the valid authorization token',
                    status: 400
                })
            }

            if (!request.body.Method) {
                return reply.code(400).send({
                    code: 'MALFORMED_REQUEST',
                    message: 'Invalid body provided',
                    errormsg: 'please provide a valid urlencoded body',
                    status: 400
                })
            }
        },
        handler: async (request, reply) => {
            const { title, image, bio, url, social, Method } = request.body

            if (Method === 'add') {
                await sqlQuery({
                    query: `INSERT INTO partners (title, image, bio, url, social) VALUES ("${title}", "${image}", "${bio}", "${url}", "${social}")`
                })
                    .then(() => {
                        return reply.code(200).send({
                            code: 'SUCCESS',
                            message: 'Partner has been added',
                            status: 200
                        })
                    })
                    .catch(e => {
                        return reply.code(500).send({
                            code: 'ERROR',
                            message: 'Failed to add partner',
                            errormsg: `${e.message}`,
                            status: 500
                        })
                    })
            } else if (Method === 'delete') {
                await sqlQuery({
                    query: `DELETE FROM partners WHERE title = "${title}"`
                })
                    .then(() => {
                        return reply.code(200).send({
                            code: 'SUCCESS',
                            message: 'Partner has been deleted',
                            status: 200
                        })
                    })
                    .catch(e => {
                        return reply.code(500).send({
                            code: 'ERROR',
                            message: 'Failed to delete partner',
                            errormsg: `${e.message}`,
                            status: 500
                        })
                    })
            } else {
                return reply.code(400).send({
                    code: 'MALFORMED_REQUEST',
                    message: 'Invalid method provided',
                    errormsg: 'should be one of: add, delete',
                    status: 400
                })
            }
        }
    })
}

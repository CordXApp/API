import * as BaseTypes from '../../@types/base';

export const states: BaseTypes.Swagger = {
    summary: 'Fetch a list of a users states (beta, admin etc)',
    description: 'Returns a list of user states as booleans',
    tags: ['Users'],
    params: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                description: 'The user ID'
            }
        }
    },
    response: {
        200: {
            description: 'Successful request/response',
            type: 'object',
            properties: {
                id: { type: 'string' },
                owner: { type: 'boolean' },
                admin: { type: 'boolean' },
                moderator: { type: 'boolean' },
                verified: { type: 'boolean' },
                beta: { type: 'boolean' },
            }
        },
        400: {
            description: 'Bad request',
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' },
            }
        },
        404: {
            description: 'User not found',
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' },
            }
        },
        500: {
            description: 'Internal Server Error',
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' },
            }
        }
    }
}
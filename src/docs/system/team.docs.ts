import * as BaseTypes from '../../@types/base';

export const team: BaseTypes.Swagger = {
    summary: 'Fetch a list of our team members',
    description: 'Returns a list of our team members and their basic info/roles',
    tags: ['Users'],
    response: {
        200: {
            description: 'Successful request/response',
            type: 'object',
            properties: {
                staff: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        username: { type: 'string' },
                        globalName: { type: 'string' },
                        avatarURL: { type: 'string' },
                        developer: { type: 'boolean' },
                        staff: { type: 'boolean' },
                    }
                }
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
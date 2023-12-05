import * as BaseTypes from '../../@types/base';

export const discord: BaseTypes.Swagger = {
    summary: `Get information about a user from the discord api`,
    description: 'Returns a users public information from the discord api',
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
            description: 'Successful request/response',
            type: 'object',
            properties: {
                id: { type: 'string' },
                global_name: { type: 'string' },
                username: { type: 'string' },
                avatar: { type: 'string' },
                banner: { type: 'string' },
                accent_color: { type: 'string' },
                banner_color: { type: 'string' },
                created_at: { type: 'string' },
                avatar_info: {
                    type: 'object',
                    properties: {
                        hash: { type: 'string' },
                        url: { type: 'string' },
                        animated: { type: 'boolean' }
                    }
                },
                banner_info: {
                    type: 'object',
                    properties: {
                        hash: { type: 'string' },
                        url: { type: 'string' },
                        color: { type: 'string' },
                        animated: { type: 'boolean' }
                    }
                },
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
        429: {
            description: 'Too many requests',
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
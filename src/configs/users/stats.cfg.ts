import * as BaseTypes from 'root/@types/base';
import { RatelimitOptions } from 'root/settings/ratelimit.cfg';

export const stats: BaseTypes.Ratelimit = {
    rateLimit: {
        max: RatelimitOptions.max,
        ban: RatelimitOptions.ban,
        timeWindow: RatelimitOptions.timeWindow,
        errorResponseHandler: async function (error, request, reply) {
            if (error) return reply.code(500).send({
                statusCode: 420,
                message: 'Rate limited',
                error: `${error.message ? error.message : error}`
            })
        },
        onExceeding: function () {
            return {
                code: 420,
                error: 'Enhance your calm',
                message: `You are sending a lot of requests, slow down chief!`,
                date: Date.now(),
                expiresIn: this.timeWindow
            }
        },
        onExceeded: function () {
            return {
                code: 429,
                error: 'Enhance your calm',
                message: `Whoops, looks like you have been rate limited. Please wait: ${this.timeWindow}ms`,
                date: Date.now(),
                expiresIn: this.timeWindow
            }
        },
        onBanReach: function () {
            return {
                code: 403,
                error: 'Forbidden',
                message: 'You are temporarily banned from this route! Please try again later.',
                date: Date.now(),
            }
        }
    }
}
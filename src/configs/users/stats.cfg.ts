import * as BaseTypes from 'root/@types/base';
import { RatelimitOptions } from 'root/settings/ratelimit.cfg';

export const stats: BaseTypes.Ratelimit = {
    rateLimit: {
        max: RatelimitOptions.max,
        timeWindow: RatelimitOptions.timeWindow,
        errorResponseHandler: async function (error, request, reply) {
            if (error) return reply.code(500).send({
                statusCode: 427,
                message: 'Rate limited',
                error: `${error.message ? error.message : error}`
            })
        },
        onExceeding: function () {
            return {
                code: 429,
                error: 'Enhance your calm',
                message: `You are being rate limited for ${this.timeWindow} milliseconds}`,
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
}
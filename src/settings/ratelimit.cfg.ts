import Redis from 'ioredis';
import env from './server.cfg';

//export const redis = new Redis(env.DATABASES.REDIS);

export const RatelimitOptions = {
    max: 10,
    ban: 30,
    global: true,
    timeWindow: 5000,
    hook: 'preHandler',
    nameSpace: 'x-cordx-ratelimit',
    cache: 5000,
    //redis: redis,
    skipOnError: false,
    continueExceeding: false,
    addHeadersOnExceeding: {
        'x-ratelimit-limit': true,
        'x-ratelimit-remaining': true,
        'x-ratelimit-reset': true
    },
    addHeaders: {
        'x-ratelimit-limit': true,
        'x-ratelimit-remaining': true,
        'x-ratelimit-reset': true,
        'retry-after': true
    }
};
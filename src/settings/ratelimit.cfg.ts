import Redis from 'ioredis';
import env from './server.cfg';

//export const redis = new Redis(env.DATABASES.REDIS);

export const RatelimitOptions = {
    max: 10,
    ban: 10,
    global: false,
    timeWindow: 1000,
    hook: 'preHandler',
    nameSpace: 'cordx-ratelimit',
    cache: 5000,
    //redis: redis,
    continueExceeding: false,
    skipOnError: false,
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
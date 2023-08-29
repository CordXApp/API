const logs = require('@plugins/logger')
const server = require('@base/server')
const Redis = require('ioredis')
// const cron = require('node-cron');

module.exports = async client => {
    const redis = new Redis(process.env.REDIS)

    client._cache = redis

    await server(client)

    logs.send('Client is online and listening to the database and server!', 'ready')

    redis.on('ready', () => {
        logs.send('redis client is online and ready', 'ready')
    })
}

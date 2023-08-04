const config = require('@configs/main')
const logs = require('@plugins/logger')
const server = require('@base/server')

module.exports = async client => {

    await server(client)

    logs.send('Client is online and listening to the database and server!', 'ready')
}
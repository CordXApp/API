const logs = require('@plugins/logger')
const { readdirSync } = require('fs')

function ClientEvents(client) {
    readdirSync('./src/listeners/').forEach(file => {
        const event = require(`../../listeners/${file}`)
        const eventName = file.split('.')[0]
        logs.send(`Loading Client Event: ${eventName}`, 'event')
        client.on(eventName, event.bind(null, client))
    })
}

module.exports = ClientEvents

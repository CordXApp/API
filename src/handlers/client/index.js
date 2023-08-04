require('module-alias/register');
require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const config = require('@configs/main');
const logs = require('@plugins/logger');
const evts = require('../events/index');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping
    ],
    allowedMentions: {
        repliedUser: true,
        parse: ['roles', 'users']
    },
    partials: ['CHANNEL', 'REACTION', 'GUILD_MEMBER', 'MESSAGE', 'USER']
})

module.exports = client

client.logs = logs
client.conf = config

evts(client)

client.login(config.token)
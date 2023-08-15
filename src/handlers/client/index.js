require('module-alias/register');
require('dotenv').config();

const config = require('@configs/main');
const logs = require('@plugins/logger');
const evts = require('../events/index');
const { Client, GatewayIntentBits } = require('discord.js');
const { generateMeme } = require('@controllers/generateMeme');
const { generateFact } = require('@controllers/generateFact');
const { generateAdvice } = require('@controllers/generateAdvice');
const { generate8ballRes } = require('@controllers/generate8ballRes');
const { genYoMamaJoke } = require('@controllers/genYoMamaJoke');

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
client.MagicBall = generate8ballRes();
client.RandomFact = generateFact();
client.GetAdvice = generateAdvice();
client.YoMommaJoke = genYoMamaJoke();
client.MemeGen = generateMeme;

evts(client)

client.login(config.token)
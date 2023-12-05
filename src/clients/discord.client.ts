import { Client, GatewayIntentBits } from 'discord.js';
import { server } from '../server';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences
    ]
})

client.on('ready', async () => {

    await server({ client: client });
});

export default client;

client.login(process.env.DISCORD_API_KEY);

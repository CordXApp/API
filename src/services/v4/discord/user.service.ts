import boom from "boom";
import env from "../../../settings/server.cfg";
import { DiscordUser } from "../../../@types/v4/users";
import snowflakeToTimestamp from "../../../utils/convertSnowflake";

export const fetchDiscordUser = async ({ id }): Promise<DiscordUser> => {

    let response = await fetch(env.DISCORD.API_URL + `users/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bot ${env.DISCORD.API_KEY}`
        }
    });

    if (response.status >= 429) throw boom.tooManyRequests('Too many requests');
    if (response.status >= 427) throw boom.tooManyRequests('Too many requests');

    let user = await response.json() as DiscordUser;

    return {
        id: user.id,
        global_name: user.global_name,
        username: parseInt(user.discriminator) !== 0 ? `${user.username}#${user.discriminator}` : user.username,
        discriminator: user.discriminator !== "0" ? user.discriminator : null,
        created_at: `${new Date(await snowflakeToTimestamp(user.id))}`,
        accent_color: user.accent_color ? user.accent_color : null,
        banner_color: user.accent_color ? user.banner_color : null,
        avatar_info: {
            hash: `${user.avatar}`,
            url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
            animated: null
        },
        banner_info: {
            hash: `${user.banner}`,
            url: `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png`,
            color: user.banner_color ? user.banner_color : null,
            animated: null,
        },
    };
}

export const fetchGuildMember = async ({ guild, user }) => {

    let response = await fetch(env.DISCORD.API_URL + `guilds/${guild}/members/${user}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bot ${env.DISCORD.API_KEY}`
        }
    });

    if (response.status >= 429) throw boom.tooManyRequests('Too many requests');
    if (response.status >= 427) throw boom.tooManyRequests('Too many requests');

    let member = await response.json();

    if (!member || response.status >= 404) throw boom.notFound('Member not found');

    return member;
}
import boom from "boom";
import env from "../../configs/server.cfg";
import { DiscordUser } from "../../@types/users";
import snowflakeToTimestamp from "../../functions/convertSnowflake";

export const fetchV3DiscordUser = async ({ id }): Promise<DiscordUser> => {

    let response = await fetch(env.DISCORD.API_URL + `users/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bot ${env.DISCORD.API_KEY}`
        }
    });

    if (response.status >= 429) throw boom.tooManyRequests('Too many requests');
    if (response.status >= 427) throw boom.tooManyRequests('Too many requests');

    let user = await response.json() as DiscordUser;
    let bannner = user?.banner ? user.banner : '';
    let avataar = user?.avatar ? user.avatar : '';

    return {
        id: user.id,
        global_name: user.global_name,
        username: parseInt(user.discriminator) !== 0 ? `${user.username}#${user.discriminator}` : user.username,
        created_at: `${new Date(await snowflakeToTimestamp(user.id))}`,
        avatar_info: {
            hash: `${user.avatar}`,
            url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
            animated: avataar.startsWith('a_') ? true : false
        },
        banner_info: {
            hash: `${user.banner}`,
            url: `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png`,
            color: user.banner_color ? user.banner_color : null,
            animated: bannner.startsWith('a_') ? true : false
        },
    };
}

export const fetchV4DiscordUser = async ({ id }): Promise<DiscordUser> => {

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

export const fetchDiscordClientUser = async ({ req }) => {

    const client = req.client;
    const guild = client.guilds.cache.get(env.GUILD.id);
    let staff = await guild.roles.cache.get(env.GUILD.roles.staff);

    const staff_array: any = [];

    await staff.members.map(async member => {

        const u = await client.users.cache.get(member.user.id);

        await staff_array.push({
            id: u.id,
            username: u.username,
            globalName: u.globalName,
            avatarURL: `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png`,
            developer: guild.members.cache.get(u.id).roles.cache.get(env.GUILD.roles.developer) ? true : false,
            staff: guild.members.cache.get(u.id).roles.cache.get(env.GUILD.roles.staff) ? true : false,
        })
    })

    if (!staff || staff.length <= 1) staff = null;

    return { staff: staff_array };
}
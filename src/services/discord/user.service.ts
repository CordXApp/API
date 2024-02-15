import boom from "boom";
import env from "../../settings/server.cfg";
import { DiscordUser } from "../../@types/v3/users";
import snowflakeToTimestamp from "../../utils/convertSnowflake";

export const fetchDiscordUser = async ({ id }): Promise<DiscordUser> => {

    console.log(id)

    let response = await fetch('https://discord.com/api/v10/' + `users/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bot ${env.DISCORD.API_KEY}`
        }
    });

    if (response.status >= 429) throw boom.tooManyRequests('Too many requests');
    if (response.status >= 427) throw boom.tooManyRequests('Too many requests');

    let user = await response.json() as DiscordUser;
    let bannner: any = user?.banner ? user.banner : '';
    let avataar: any = user?.avatar ? user.avatar : '';

    return {
        id: user.id,
        global_name: user.global_name,
        created_at: `${new Date(await snowflakeToTimestamp(user.id))}`,
        avatar: {
            id: avataar,
            link: `https://cdn.discordapp.com/avatars/${user.id}/${avataar}.png`,
            is_animated: avataar.startsWith('a_') ? true : false,
        },
        banner: {
            id: bannner,
            link: `https://cdn.discordapp.com/banners/${user.id}/${bannner}.png`,
            is_animated: bannner.startsWith('a_') ? true : false,
            color: user.banner_color,
        },
    };
}

export const fetchClientUser = async ({ req }) => {

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
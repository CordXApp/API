import { boomify } from "boom";

async function getCachedUser({ client, userId }) {

    if (!userId) throw new Error('No user id provided');
    if (!client) throw new Error('No client provided');

    let user = await client.users.cache.get(userId);

    if (!user || user == null || user == undefined) user = 'Undefined'

    return user;
}

const discord = { getCachedUser }

export default discord;
const logs = require('@plugins/logger')

module.exports.getCachedUser = async function ({ client, userId }) {
    if (!userId) return logs.send('No valid user provided for cache fetch', 'error')

    let user = await client.users.cache.get(userId)

    console.log(user)

    if (!user || user == null || user == undefined) user = 'Undefined'

    return user
}
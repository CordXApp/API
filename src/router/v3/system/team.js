module.exports = async function (fastify) {
    fastify.route({
        url: '/team',
        method: ['GET'],
        schema: {
            summary: 'View a list of our team members',
            description: 'Returns an object of staff members and an object of developers',
            tags: ['System'],
            response: {
                200: {
                    description: 'Successful request',
                    type: 'object',
                    properties: {
                        staff: { type: 'array' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            const client = request.client
            const guild = client.guilds.cache.get('871204257649557604')
            let staff = await guild.roles.cache.get('1138246343412953218')

            const staff_array = []

            await staff.members.map(async s => {
                const u = await client.users.cache.get(s.user.id)

                await staff_array.push({
                    userid: u.id,
                    username: u.username,
                    globalName: u.globalName,
                    avatarURL: `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}`,
                    developer: guild.members.cache.get(u.id).roles.cache.has('871275407134040064') ? true : false
                })
            })

            if (!staff || staff.length <= 1) staff = null

            return reply.code(200).send({
                staff: staff_array
            })
        }
    })
}

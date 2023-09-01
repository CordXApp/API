const Axios = require('axios')

module.exports = async function (fastify) {
    fastify.route({
        url: '/uptime/list',
        method: ['GET'],
        schema: {
            summary: 'View our advanced status information',
            description: 'Returns a list of uptime, and downtime ratios',
            tags: ['Status'],
            response: {
                200: {
                    description: 'Successful request',
                    type: 'array',
                    properties: {}
                }
            }
        },
        handler: async (request, reply) => {
            reply.header('Content-Type', 'application/json')
            reply.header('Access-Control-Allow-Origin', '*')

            const urlencoded = new URLSearchParams()
            urlencoded.append('api_key', process.env.STATUS_KEY)
            urlencoded.append('response_times', '1')
            urlencoded.append('custom_uptime_ratios', '7-30-49')

            const response = await Axios.post(process.env.STATUS_MONITOR, urlencoded, {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'cache-control': 'no-cache'
                }
            })

            return reply.code(200).send(JSON.stringify(response.data.monitors))
        }
    })
}

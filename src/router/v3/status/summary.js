module.exports = async (fastify, opts) => {

    fastify.get('/summary', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        const response = await fetch('https://cordx.instatus.com/summary.json', {
            method: 'GET'
        });

        const data = await response.json();

        reply.code(200).send(data)
    })
}
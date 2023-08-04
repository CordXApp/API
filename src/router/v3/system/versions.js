const { sendGithubRequest } = require('@plugins/requests/rawGitRequest');

module.exports = async (fastify, opts) => {

    fastify.get('/check/versions', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        return reply.code(200).json({
            current: {
                api: `${await sendGithubRequest({ repo: 'CordXApp/Website', branch: 'master', path: 'package.json'})}`, 
                client: `${await sendGithubRequest({ repo: 'CordXApp/Client', branch: 'master', path: 'package.json'})}`,
                website: `${await sendGithubRequest({ repo: 'CordXApp/Client', branch: 'master', path: 'package.json'})}`
            },
            newest: {
                api: `${await sendGithubRequest({ repo: 'CordXApp/API', branch: 'master', path: 'package.json'})}`,
                client: `${await sendGithubRequest({ repo: 'CordXApp/Client', branch: 'master', path: 'package.json'})}`,
                website: `${await sendGithubRequest({ repo: 'CordXApp/Beta', branch: 'master', path: 'package.json'})}`
            },
            stable: {
                api: `${await sendGithubRequest({ repo: 'CordXApp/API', branch: 'master', path: 'package.json'})}`, 
                client: `${await sendGithubRequest({ repo: 'CordXApp/Client', branch: 'master', path: 'package.json'})}`,
                website: `${await sendGithubRequest({ repo: 'CordXApp/Website', branch: 'master', path: 'package.json'})}`
            }
        })
    })
}
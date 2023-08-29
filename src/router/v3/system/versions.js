const { sendGithubRequest } = require('@plugins/requests/rawGitRequest')

module.exports = async fastify => {
    fastify.get('/check/versions', async reply => {
        reply.header('Content-Type', 'application/json')

        return reply.code(200).send({
            current: {
                api: `v${await sendGithubRequest({
                    repo: 'CordXApp/OldWebsite',
                    branch: 'master',
                    path: 'package.json'
                })}`,
                client: `v${await sendGithubRequest({
                    repo: 'CordXApp/Client',
                    branch: 'master',
                    path: 'package.json'
                })}`,
                website: `v${await sendGithubRequest({
                    repo: 'CordXApp/OldWebsite',
                    branch: 'master',
                    path: 'package.json'
                })}`
            },
            newest: {
                api: `v${await sendGithubRequest({ repo: 'CordXApp/API', branch: 'master', path: 'package.json' })}`,
                client: `v${await sendGithubRequest({
                    repo: 'CordXApp/Client',
                    branch: 'master',
                    path: 'package.json'
                })}`,
                website: `v${await sendGithubRequest({
                    repo: 'CordXApp/Website',
                    branch: 'master',
                    path: 'package.json'
                })}`
            },
            stable: {
                api: `v${await sendGithubRequest({ repo: 'CordXApp/API', branch: 'master', path: 'package.json' })}`,
                client: `v${await sendGithubRequest({
                    repo: 'CordXApp/Client',
                    branch: 'master',
                    path: 'package.json'
                })}`,
                website: `v${await sendGithubRequest({
                    repo: 'CordXApp/Beta',
                    branch: 'master',
                    path: 'package.json'
                })}`
            }
        })
    })
}

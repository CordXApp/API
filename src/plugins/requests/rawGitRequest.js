const logs = require('@plugins/logger')
const axios = require('axios')

module.exports.sendGithubRequest = async function ({ repo, branch, path }) {
    if (!repo) return logs.send('Undefined fetch options. Please fix your code!', 'error')
    if (!branch) return logs.send('Undefined fetch options. Please fix your code!', 'error')

    const url = `https://raw.githubusercontent.com/${repo}/${branch}/${path}`

    const resp = await axios
        .get(url, {
            headers: {
                Authorization: `token ${process.env.GIT_TOKEN}`
            }
        })
        .then(res => res)

    const version = resp.data.version ? resp.data.version : null

    return version
}

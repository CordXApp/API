/**
 * SIMPLE VERSION CHECKER USING THE GITHUB API AND PACKAGE.JSON
 */
import axios from 'axios';
import env from '../../configs/server.cfg';

async function getProjectVersion({ repo, branch }) {

    if (!repo) throw new Error("Please provide a repository name.");
    if (!branch) throw new Error("Please provide a branch name.");

    const url = `https://raw.githubusercontent.com/${repo}/${branch}/package.json`;

    const resp = await axios.get(url, { headers: { Authorization: `token ${env.GITHUB.TOKEN}` } }).then((res) => res.data);

    return resp.version ? resp.version : null;
}

const github = { getProjectVersion }

export default github;
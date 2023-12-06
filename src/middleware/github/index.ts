/**
 * SIMPLE VERSION CHECKER USING THE GITHUB API AND PACKAGE.JSON
 */
import axios from 'axios';
import env from '../../settings/server.cfg';

async function getProjectVersion({ repo, branch }) {

    if (!repo) throw new Error("Please provide a repository name.");
    if (!branch) throw new Error("Please provide a branch name.");

    const url = `https://raw.githubusercontent.com/${repo}/${branch}/package.json`;

    const resp = await axios.get(url, { headers: { Authorization: `token ${env.GITHUB.TOKEN}` } }).then((res) => res.data);

    return resp.version ? resp.version : null;
}

async function getProjectSize({ repo, branch }) {

    if (!repo) throw new Error("Please provide a repository name.");
    if (!branch) throw new Error("Please provide a branch name.");

    const url = `https://api.github.com/repos/${repo}/${branch}`;

    const resp = await axios.get(url, { headers: { Authorization: `token ${env.GITHUB.TOKEN}` } }).then((res) => res.data);

    return resp.size ? resp.size : null;
}

async function getProjectInfo({ repo, branch }) {

    if (!repo) throw new Error("Please provide a repository name.");
    if (!branch) throw new Error("Please provide a branch name.");

    const url = `https://api.github.com/repos/${repo}/${branch}`;

    const resp = await axios.get(url, { headers: { Authorization: `token ${env.GITHUB.TOKEN}` } }).then((res) => res.data);

    return resp ? resp : null;
}

async function getProjectLanguages({ repo, branch }) {

    if (!repo) throw new Error("Please provide a repository name.");
    if (!branch) throw new Error("Please provide a branch name.");

    const url = `https://api.github.com/repos/${repo}/${branch}/languages`;

    const resp = await axios.get(url, { headers: { Authorization: `token ${env.GITHUB.TOKEN}` } }).then((res) => res.data);

    return resp ? resp : null;
}

const github = { getProjectVersion, getProjectSize }

export default github;
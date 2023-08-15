const logs = require('@plugins/logger')
const got = (...args) => import('got').then(({default: got}) => got(...args));

module.exports.generateMeme = async function ({ topic }) {

    let meme = await got(`https://reddit.com/r/${topic}/random/.json`).then(res => JSON.parse(res.body));
    let m;

    if (!meme[0] || !meme) m = null;
    else m = meme[0].data.children[0].data; 
    
    return m;
} 
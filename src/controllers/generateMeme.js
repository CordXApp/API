const got = (...args) => import('got').then(({ default: got }) => got(...args))

module.exports.generateMeme = async function ({ topic }) {
    const meme = await got(`https://reddit.com/r/${topic}/random/.json`).then(res => JSON.parse(res.body))
    let m

    if (!meme[0] || !meme) m = null
    else if (meme[0].data.children[0].data.over_18) m = null
    else if (meme[0].data.children[0].data.url.endsWith('.png' || '.gif' || '.jpeg' || '.jpg')) m = null
    else m = meme[0].data.children[0].data

    return m
}

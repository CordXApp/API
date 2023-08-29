const { generateMeme } = require('@controllers/generateMeme')

module.exports = async fastify => {
    fastify.get('/memes', async reply => {
        reply.header('Content-Type', 'application/json')

        const meme = await generateMeme({ topic: 'memes' })

        return reply.code(200).send({
            title: meme.title,
            image: meme.url,
            link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
            author: meme.author,
            upvotes: meme.ups,
            comments: meme.num_comments,
            nsfw: meme.over_18
        })
    })

    fastify.get('/memes/dank', async reply => {
        reply.header('Content-Type', 'application/json')

        const meme = await generateMeme({ topic: 'dank' })

        return reply.code(200).send({
            title: meme.title,
            image: meme.url,
            link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
            author: meme.author,
            upvotes: meme.ups,
            comments: meme.num_comments,
            nsfw: meme.over_18
        })
    })

    fastify.get('/memes/danker', async reply => {
        reply.header('Content-Type', 'application/json')

        const meme = await generateMeme({ topic: 'dankmemes' })

        return reply.code(200).send({
            title: meme.title,
            image: meme.url,
            link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
            author: meme.author,
            upvotes: meme.ups,
            comments: meme.num_comments,
            nsfw: meme.over_18
        })
    })

    fastify.get('/memes/prequel', async reply => {
        reply.header('Content-Type', 'application/json')

        const meme = await generateMeme({ topic: 'prequelmemes' })

        return reply.code(200).send({
            title: meme.title,
            image: meme.url,
            link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
            author: meme.author,
            upvotes: meme.ups,
            comments: meme.num_comments,
            nsfw: meme.over_18
        })
    })

    fastify.get('/memes/facebook', async reply => {
        reply.header('Content-Type', 'application/json')

        const meme = await generateMeme({ topic: 'terriblefacebookmemes' })

        return reply.code(200).send({
            title: meme.title,
            image: meme.url,
            link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
            author: meme.author,
            upvotes: meme.ups,
            comments: meme.num_comments,
            nsfw: meme.over_18
        })
    })

    fastify.get('/memes/wholesome', async reply => {
        reply.header('Content-Type', 'application/json')

        const meme = await generateMeme({ topic: 'wholesomememes' })

        return reply.code(200).send({
            title: meme.title,
            image: meme.url,
            link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
            author: meme.author,
            upvotes: meme.ups,
            comments: meme.num_comments,
            nsfw: meme.over_18
        })
    })

    fastify.get('/memes/deepfried', async reply => {
        reply.header('Content-Type', 'application/json')

        const meme = await generateMeme({ topic: 'deepfriedmemes' })

        return reply.code(200).send({
            title: meme.title,
            image: meme.url,
            link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
            author: meme.author,
            upvotes: meme.ups,
            comments: meme.num_comments,
            nsfw: meme.over_18
        })
    })

    fastify.get('/memes/surreal', async reply => {
        reply.header('Content-Type', 'application/json')

        const meme = await generateMeme({ topic: 'surrealmemes' })

        return reply.code(200).send({
            title: meme.title,
            image: meme.url,
            link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
            author: meme.author,
            upvotes: meme.ups,
            comments: meme.num_comments,
            nsfw: meme.over_18
        })
    })

    fastify.get('/memes/funny', async reply => {
        reply.header('Content-Type', 'application/json')

        const meme = await generateMeme({ topic: 'funny' })

        return reply.code(200).send({
            title: meme.title,
            image: meme.url,
            link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
            author: meme.author,
            upvotes: meme.ups,
            comments: meme.num_comments,
            nsfw: meme.over_18
        })
    })

    fastify.get('/memes/last', async reply => {
        reply.header('Content-Type', 'application/json')

        const meme = await generateMeme({ topic: 'lastimages' })

        return reply.code(200).send({
            title: meme.title,
            image: meme.url,
            link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
            author: meme.author,
            upvotes: meme.ups,
            comments: meme.num_comments,
            nsfw: meme.over_18
        })
    })

    fastify.get('/memes/economy', async reply => {
        reply.header('Content-Type', 'application/json')

        const meme = await generateMeme({ topic: 'memeeconomy' })

        return reply.code(200).send({
            title: meme.title,
            image: meme.url,
            link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
            author: meme.author,
            upvotes: meme.ups,
            comments: meme.num_comments,
            nsfw: meme.over_18
        })
    })

    fastify.get('/memes/cats', async reply => {
        reply.header('Content-Type', 'application/json')

        const meme = await generateMeme({ topic: 'cats' })

        return reply.code(200).send({
            title: meme.title,
            image: meme.url,
            link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
            author: meme.author,
            upvotes: meme.ups,
            comments: meme.num_comments,
            nsfw: meme.over_18
        })
    })

    fastify.get('/memes/dogs', async reply => {
        reply.header('Content-Type', 'application/json')

        const meme = await generateMeme({ topic: 'dogs' })

        return reply.code(200).send({
            title: meme.title,
            image: meme.url,
            link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
            author: meme.author,
            upvotes: meme.ups,
            comments: meme.num_comments,
            nsfw: meme.over_18
        })
    })
}

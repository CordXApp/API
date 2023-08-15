module.exports = async (fastify, opts) => {

    fastify.get('/memes', async (request, reply) => {
        
        reply.header('Content-Type', 'application/json');

        let meme = await request.client.MemeGen({ topic: 'memes' });

        return reply.code(200).send({
            title: meme.title,
            image: meme.url,
            link: `https://reddit.com/${meme.subreddit_name_prefixed}`,
            author: meme.author,
            upvotes: meme.ups,
            comments: meme.num_comments,
            nsfw: meme.over_18
        })
    });

    fastify.get('/memes/dank', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let meme = await request.client.MemeGen({ topic: 'dank' });

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

    fastify.get('/memes/danker', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let meme = await request.client.MemeGen({ topic: 'dankmemes' });

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

    fastify.get('/memes/prequel', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let meme = await request.client.MemeGen({ topic: 'prequelmemes' });

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

    fastify.get('/memes/facebook', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let meme = await request.client.MemeGen({ topic: 'terriblefacebookmemes' });

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

    fastify.get('/memes/wholesome', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let meme = await request.client.MemeGen({ topic: 'wholesomememes' });

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

    fastify.get('/memes/deepfried', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let meme = await request.client.MemeGen({ topic: 'deepfriedmemes' });

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

    fastify.get('/memes/surreal', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let meme = await request.client.MemeGen({ topic: 'surrealmemes' });

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

    fastify.get('/memes/funny', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let meme = await request.client.MemeGen({ topic: 'funny' });

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

    fastify.get('/memes/last', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let meme = await request.client.MemeGen({ topic: 'lastimages' });

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

    fastify.get('/memes/economy', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let meme = await request.client.MemeGen({ topic: 'memeeconomy' });

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

    fastify.get('/memes/cats', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let meme = await request.client.MemeGen({ topic: 'cats' });

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

    fastify.get('/memes/dogs', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let meme = await request.client.MemeGen({ topic: 'dogs' });

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
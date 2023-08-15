const jokes = require('@json/lists/yomomma');

module.exports.genYoMamaJoke = async function () {

    const getJoke = (index) => {

        const joke = jokes[index]

        if (joke) return joke
        else return undefined
    }

    const getRandomJoke = async () => {

        const index = Math.floor(Math.random() * jokes.length);

        const joke = await getJoke(index);

        return joke;
    }

    return getRandomJoke()
} 
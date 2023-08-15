const facts = require('@json/lists/facts');

module.exports.generateFact = async function () {

    const getFact = (index) => {

        const fact = facts[index]

        if (fact) return fact
        else return undefined
    }

    const getRandomFact = async () => {

        const index = Math.floor(Math.random() * facts.length);

        const fact = await getFact(index);

        return fact;
    }

    return getRandomFact()
} 
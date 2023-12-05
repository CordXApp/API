const responses = require('../json/8ball.json')

async function generate8BallRes() {

    const response = await responses[Math.floor(Math.random() * responses.length)];

    return response;
}

export default generate8BallRes;
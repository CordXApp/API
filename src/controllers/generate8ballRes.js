const responses = require("@json/8ball");

module.exports.generate8ballRes = async function () {

    let response = await responses[Math.floor(Math.random() * responses.length)];

    return response;
} 
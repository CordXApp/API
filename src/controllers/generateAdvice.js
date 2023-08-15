const logs = require('@plugins/logger')

module.exports.generateAdvice = async function () {

    let res = await fetch('https://api.adviceslip.com/advice')
    .then(res => res.json())
    .then(data => data)
    .catch((e) => logs.send(`Error fetching advice: ${e.stack}`, 'error '));

    return res.slip.advice;
} 
import { boomify } from "boom";

const responses = require('../json/8ball.json')

export const generate8BallRes = async (): Promise<any> => {

    const response = await responses[Math.floor(Math.random() * responses.length)];

    return response;
}

export const generateAdvice = async (): Promise<any> => {

    const response = await fetch('https://api.adviceslip.com/advice')

    return response.json();
}
const responses = require('../json/8ball.json')
import { catFacts } from "../json/facts/cats";

export const generate8BallRes = async (): Promise<any> => {

    const response = await responses[Math.floor(Math.random() * responses.length)];

    return response;
}

export const generateCatFact = async (): Promise<any> => {

    const response = await catFacts[Math.floor(Math.random() * catFacts.length)];

    return response;
}

export const generateAdvice = async (): Promise<any> => {

    const response = await fetch('https://api.adviceslip.com/advice')

    return response.json();
}

export const generateCatPic = async (): Promise<any> => {

    const response = await fetch('https://api.thecatapi.com/v1/images/search');

    return response.json();
}
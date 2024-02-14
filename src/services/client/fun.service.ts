import boom from "boom";
import env from "../../settings/server.cfg";
import { generate8BallRes } from '../../functions/fun.functions';
import { generateAdvice } from '../../functions/fun.functions';
import * as Typings from '../../@types/v3/fun';

export const fetch8BallResponse = async (): Promise<Typings.Magic8Ball> => {

    return { response: await generate8BallRes() }
}

export const fetchAdvice = async (): Promise<Typings.AdviceSlip> => {

    return { advice: await generateAdvice() }
}
import boom from "boom";
import env from "../../configs/server.cfg";
import generate8BallRes from '../../functions/fun.functions';

export const fetch8BallResponse = async (): Promise<any> => {

    const response = await generate8BallRes();

    return {
        response: response
    };
}
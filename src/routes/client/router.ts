import * as handler from '../../handlers/fun.handler';
import { v3Controllers } from '../../controllers/base.controller';
import { RouterTypes } from "../../@types/base";

const get8BallResponse: RouterTypes = {
    method: "GET",
    url: "/client/8ball/:q",
    handler: v3Controllers.get8BallResponse,
    preHandler: handler.get8BallHandler,
};

const getAdvice: RouterTypes = {
    method: "GET",
    url: "/client/advice",
    handler: v3Controllers.getAdvice
};

const clientRoutes: any[] = [
    getAdvice,
    get8BallResponse
];

export default clientRoutes
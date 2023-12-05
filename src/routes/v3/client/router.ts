import * as handler from '../../../handlers/v3/fun.handler';
import { get8BallHandler } from '../../../handlers/v3/fun.handler';
import * as controller from '../../../controllers/v3/client/client.controller';
import { RouterTypes } from "../../../@types/base";

const get8BallResponse: RouterTypes = {
    method: "GET",
    url: "/v3/client/8ball/:q",
    handler: controller.get8BallResponse,
    preHandler: handler.get8BallHandler,
};

const clientRoutes: any[] = [
    get8BallResponse
];

export default clientRoutes
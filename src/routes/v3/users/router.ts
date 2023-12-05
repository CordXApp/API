import { RouteOptions } from "fastify";
import * as handler from '../../../handlers/v3/user.handler';
import * as controller from '../../../controllers/v3/users/user.controller';
import userDocs from '../../../docs/users/index';
import { RouterTypes } from "../../../@types/base";

const getUserState: RouterTypes = {
    method: "GET",
    url: "/v3/users/states/:userId",
    schema: userDocs.states,
    handler: controller.getUserStates,
};

const getDiscordUser: RouterTypes = {
    method: "GET",
    url: "/v3/users/discord/:userId",
    handler: controller.getDiscordUser,
    preHandler: handler.getDiscordUser,
    schema: userDocs.discord,
};

const userRoutes: any[] = [
    getUserState,
    getDiscordUser
];

export default userRoutes
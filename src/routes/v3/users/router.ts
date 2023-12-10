import { RouteOptions } from "fastify";
import * as handler from '../../../handlers/v3/user.handler';
import * as controller from '../../../controllers/v3/users/user.controller';
import userDocs from '../../../docs/users/index';
import { RouterTypes } from "../../../@types/base";

const getUserState: RouterTypes = {
    method: "GET",
    url: "/v3/users/:userId/states",
    schema: userDocs.states,
    handler: controller.getUserStates,
};

const getDiscordUser: RouterTypes = {
    method: "GET",
    url: "/v3/users/:userId/discord",
    handler: controller.getDiscordUser,
    preHandler: handler.getDiscordUser,
    schema: userDocs.discord,
};

const getUserStats: RouterTypes = {
    method: "GET",
    url: "/v3/users/:userId/stats",
    handler: controller.getUserBuckets,
    preHandler: handler.getUserBuckets,
};

const getUserImage: RouterTypes = {
    method: "GET",
    url: "/v3/users/:userId/images/:imageId",
    handler: controller.getUserImage,
};

const userRoutes: any[] = [
    getUserStats,
    getUserState,
    getUserImage,
    getDiscordUser
];

export default userRoutes
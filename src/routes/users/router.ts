import { RouteOptions } from "fastify";
import * as handler from '../../handlers/user.handler';
import { v3Controllers } from '../../controllers/base.controller';
import userDocs from '../../docs/users/index';
import { RouterTypes } from "../../@types/base";

const getUserState: RouterTypes = {
    method: "GET",
    url: "/users/:userId/states",
    schema: userDocs.states,
    handler: v3Controllers.getUserStates,
};

const getDiscordUser: RouterTypes = {
    method: "GET",
    url: "/users/:userId/discord",
    handler: v3Controllers.getDiscordUser,
    preHandler: handler.getDiscordUser,
    schema: userDocs.discord,
};

const getUserStats: RouterTypes = {
    method: "GET",
    url: "/users/:userId/stats",
    handler: v3Controllers.getUserBuckets,
    preHandler: handler.getUserBuckets,
};

const getUserImage: RouterTypes = {
    method: "GET",
    url: "/users/:userId/images/:imageId",
    handler: v3Controllers.getUserImage,
};

const userRoutes: any[] = [
    getUserStats,
    getUserState,
    getUserImage,
    getDiscordUser
];

export default userRoutes
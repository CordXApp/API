import { ServerResponse } from "http";
import { FastifyReply, FastifyRequest } from "fastify";
import v3Services from "../../../services/v3/base.service";
import { userStates, DiscordUser, UserStats } from "../../../@types/v3/users";

export const getUserStates = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
): Promise<userStates> => await v3Services.fetchUserStates({ userId: req.params.userId });

export const getDiscordUser = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
): Promise<DiscordUser> => await v3Services.fetchDiscordUser({ id: req.params.userId });

export const getUserBuckets = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
): Promise<UserStats> => await v3Services.fetchUserBucket({ req: req, res: reply });

export const getUserImage = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
): Promise<any> => await v3Services.fetchUserImage({ req: req, res: reply });
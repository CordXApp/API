import { ServerResponse } from "http";
import { FastifyReply, FastifyRequest } from "fastify";
import { fetchUserStates } from "../../../services/mongo/user.service";
import { fetchV3DiscordUser } from "../../../services/discord/user.service";
import { fetchUserBucket } from "../../../services/spaces/spaces.service";
import { fetchUserImage } from "../../../services/spaces/spaces.service";
import { userStates, DiscordUser, UserStats } from "root/@types/users";

export const getUserStates = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
): Promise<userStates> => await fetchUserStates({ userId: req.params.userId });

export const getDiscordUser = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
): Promise<DiscordUser> => await fetchV3DiscordUser({ id: req.params.userId });

export const getUserBuckets = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
): Promise<UserStats> => await fetchUserBucket({ req: req, res: reply });

export const getUserImage = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
): Promise<any> => await fetchUserImage({ req: req, res: reply });
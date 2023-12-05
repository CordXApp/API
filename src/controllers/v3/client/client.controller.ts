import { ServerResponse } from "http";
import { FastifyReply, FastifyRequest } from "fastify";
import { fetch8BallResponse } from '../../../services/discord/fun.service';

export const get8BallResponse = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
): Promise<any> => await fetch8BallResponse();
import { ServerResponse } from "http";
import { FastifyReply, FastifyRequest } from "fastify";
import v3Services from "../../../services/base.service";

export const get8BallResponse = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
): Promise<any> => await v3Services.fetch8BallResponse();

export const getAdvice = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
): Promise<any> => await v3Services.fetchAdvice();
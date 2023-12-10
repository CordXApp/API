import { ServerResponse } from "http";
import env from '../../settings/server.cfg';
import { FastifyReply, FastifyRequest } from "fastify";

export const get8BallHandler = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
) => {

    const question = req.params.q;

    if (!question) return reply.code(400).send({
        statusCode: 400,
        error: "Bad request",
        message: "Please provide a valid question for the 8ball."
    });
};
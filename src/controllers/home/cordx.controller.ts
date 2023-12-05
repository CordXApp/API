import { ServerResponse } from "http";
import { FastifyReply, FastifyRequest } from "fastify";
import { version } from "../../../package.json";

export const homePage = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
): Promise<any> => {
    try {

        return reply.status(200).send({
            statusCode: 200,
            message: "Welcome to the CordX API, please refer to the documentation for more information.",
            version: `v${version}`
        });

    } catch (err: any) {

        return reply.status(500).send({
            statusCode: 500,
            error: "Internal Server Error",
            message: err.message
        })
    }
}; 
import { ServerResponse } from "http";
import env from '../../settings/server.cfg';
import { FastifyReply, FastifyRequest } from "fastify";

export const getDiscordUser = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
) => {

    const { userId } = req.params;

    const test = await fetch(env.DISCORD.API_URL + `/users/${userId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bot ${env.DISCORD.API_KEY}`
        }
    });

    if (test.status === 500) return reply.code(500).send({
        statusCode: 500,
        error: "Internal Server Error",
        message: "Something went wrong while trying to fetch the user from the discord api.",
        errorMsg: "No error message provided."

    })

    if (test.status >= 429) return reply.code(429).send({
        statusCode: 429,
        error: "Too many requests",
        message: "You are being ratelimited, please try again later."
    });

    if (test.status >= 427) return reply.code(429).send({
        statusCode: 429,
        error: "Too many requests",
        message: "You are being ratelimited, please try again later."
    });

    if (!userId) return reply.code(400).send({
        statusCode: 400,
        error: "Bad request",
        message: "You must provide a valid user id/snowflake."
    });
};
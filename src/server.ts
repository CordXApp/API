require("dotenv").config();

import fastify from "fastify";
import env from "./configs/server.cfg";
import dbConnect from "./clients/mongo.client";
import { RatelimitOptions } from "./configs/ratelimit.cfg";
import { Options } from "./configs/swagger.cfg";
import serverHealth from 'server-health'
import { redis } from './configs/ratelimit.cfg'
import routes from "./routes";

export async function server({ client }) {

    const app = fastify({ logger: true });

    serverHealth.exposeHealthEndpoint(app, '/health', 'fastify');

    serverHealth.addConnectionCheck('mongoose', async () => {
        let connection = await dbConnect();
        if (connection) return true;
        else return false;
    })

    serverHealth.addConnectionCheck('redis', async () => {
        let connection = await redis.ping();
        if (connection) return true;
        else return false;
    })

    app.register(require('fastify-oas'), Options);
    app.register(require('@fastify/rate-limit'), RatelimitOptions);

    routes.forEach(r => app.route(r));

    app.addHook('preHandler', (req, res, done) => {

        //@ts-expect-error
        req.client = client;

        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', '*')
        res.header('X-Powered-By', 'Infinity Development')

        done()
    });

    app.setNotFoundHandler(function (request, reply) {
        reply.code(404).send({
            message: 'Unable to locate the provided route, please check your query and try again!',
            error: true,
            fatal: false,
            status: 404
        })
    });

    app.setErrorHandler(async function (error, request, reply) {

        await console.log(error.stack)

        if (error.validation) {
            return reply.code(400).send({
                statusCode: 400,
                error: "Bad Request",
                message: error.message
            })
        }

        return reply.code(500).send({
            statusCode: 500,
            error: "Internal Server Error",
            message: error.message
        })
    });

    app.ready(err => {
        if (err) throw err;

        //@ts-expect-error
        app.oas()
    });

    const start = async (): Promise<void> => {

        try {

            await app.listen({
                port: env.APP.PORT,
                host: '0.0.0.0'
            });

            app.log.info('Server listening on port %s', env.APP.PORT);

            await dbConnect()
                .then(() => app.log.info('MongoDB connected successfully'))
                .catch(err => app.log.error(err.stack));

        } catch (err: any) {

            return app.log.error(err.stack);
        }
    }

    start();
}
require("dotenv").config();

import fastify from "fastify";
import { ServerResponse } from "http";
import env from "./settings/server.cfg";
import dbConnect from "./clients/mongo.client";
import { SpacesClient } from "./utils/spacesClient";
import packageJSON from "../package.json";
import routes from "./routes";

import { Options } from "./settings/swagger.cfg";
import { RatelimitOptions } from "./settings/ratelimit.cfg";
import { CorsOptions } from "./settings/cors.cfg";

export async function server({ client }) {

    const now = () => Date.now();

    const app = fastify({
        logger: true,
        onProtoPoisoning: 'remove',
        onConstructorPoisoning: 'remove',
        pluginTimeout: 10000,
        disableRequestLogging: true,
        genReqId: () => require('uuid').v4(),
    });

    app.register(require('fastify-oas'), Options);
    app.register(require('@fastify/cors'), CorsOptions);
    app.register(require('@fastify/rate-limit'), RatelimitOptions);

    routes.forEach(r => app.route(r));

    app.addHook('preHandler', (req, res, done) => {

        req.client = client;
        req.spaces = new SpacesClient();

        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', '*')
        res.header('X-Powered-By', 'Infinity Development')
        res.header('User-Agent', `CordX_API:v${packageJSON.version}`)

        done()
    });

    app.addHook('onRequest', (req, res, done) => {
        res.startTime = now();
        req.log.info({
            url: req.raw.url
        }, "Incoming request")

        done()
    })

    app.addHook("onResponse", (req, res, done) => {
        req.log.info({
            url: req.raw.url,
            duration: now() - res.startTime
        }, "Outgoing response")

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

        if (error.stack) {
            request.log.error(error.stack);
        } else {
            request.log.error(error.message);
        }

        if (error.validation) {
            return reply.code(400).send({
                status: "CORDX:BAD_REQUEST",
                message: error.message,
                error: error.validation,
                fatal: false,
                code: 400
            })
        }

        return reply.code(500).send({
            status: "CORDX:INTERNAL_SERVER_ERROR",
            message: "An internal server error occurred, please try again later!",
            error: error.message,
            fatal: true,
            code: 500
        })
    });

    app.ready(err => {
        if (err) throw err;

        app.oas()
    });

    const start = async (): Promise<void> => {

        app.listen({
            host: '0.0.0.0',
            port: env.APP.PORT
        }).then(() => {
            dbConnect().then(() => {
                app.log.info(`Connected to mongoDB successfully!`);
            }).catch((err: Error) => {
                console.error(err.stack ? err.stack : err.message);
                process.exit(1);
            })
        }).catch((err: Error) => {
            console.error(err.stack ? err.stack : err.message);
            process.exit(1);
        })
    }

    start();
}

declare module "fastify" {
    interface FastifyRequest {
        client: any
        spaces: SpacesClient
    }
    interface FastifyInstance {
        oas(options?: any): void
    }
    interface FastifyReply<HttpResponse = ServerResponse> {
        startTime: number
        raw: FastifyReply<HttpResponse>
    }
}
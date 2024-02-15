require("dotenv").config();

import fastify from "fastify";
import env from "./settings/server.cfg";
import dbConnect from "./clients/mongo.client";
import { SpacesClient } from "./utils/spacesClient";
import simpleForm from "fastify-simple-form";
import packageJSON from "../package.json";
import routes from "./routes";

/**
 * PLUGIN CONFIGS
 */
import { Options } from "./settings/swagger.cfg";
import { RatelimitOptions } from "./settings/ratelimit.cfg";
import { CorsOptions } from "./settings/cors.cfg";

export async function server({ client }) {

    const app = fastify({ logger: true });

    app.register(require('fastify-oas'), Options);
    app.register(require('@fastify/cors'), CorsOptions);
    app.register(require('@fastify/rate-limit'), RatelimitOptions);
    app.register(simpleForm, {
        multipart: env.FORMAL.MULTI,
        urlencoded: env.FORMAL.ENCODED
    });

    routes.forEach(r => app.route(r));

    app.addHook('preHandler', (req, res, done) => {

        //@ts-expect-error
        req.client = client;
        //@ts-expect-error
        req.spaces = new SpacesClient();

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

        console.log(error.stack?.toString() || error.message);

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
            message: error.message,
        })
    });

    app.ready(err => {
        if (err) throw err;

        //@ts-expect-error
        app.oas()
    });

    const start = async (): Promise<void> => {

        app.listen({
            host: '0.0.0.0',
            port: env.APP.PORT
        }).then(() => {
            dbConnect().then(() => {
                console.log(`Database connection established successfully!`);
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
import { ServerResponse } from "http";
import { FastifyReply, FastifyRequest } from "fastify";
import v3Services from "../../services/base.service";
import * as Typings from '../../@types/v3/status'

export const statusCompFilter = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
): Promise<Typings.Component> => await v3Services.statusCompFilter({ req: req, reply: reply });

export const statusSummary = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
): Promise<Typings.Summary> => await v3Services.statusSummary({ req: req, reply: reply });

export const pageComponents = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
): Promise<Typings.Component[]> => await v3Services.pageComponents({ req: req, reply: reply })

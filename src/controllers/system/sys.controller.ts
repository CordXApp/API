import { ServerResponse } from "http";
import { FastifyReply, FastifyRequest } from "fastify";
import v3Services from "../../../services/base.service";
import * as Typings from '../../../@types/v3/sys'

export const getWebStats = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
): Promise<Typings.WebsiteStats> => await v3Services.getWebsiteStats();

export const getProjectVersions = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
): Promise<Typings.ProjectVersions> => await v3Services.fetchProjectVersions();

export const getTeamList = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
): Promise<Typings.TeamList> => await v3Services.fetchClientUser({ req: req });
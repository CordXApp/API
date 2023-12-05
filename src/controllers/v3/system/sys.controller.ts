import { ServerResponse } from "http";
import { FastifyReply, FastifyRequest } from "fastify";
import { getWebsiteStats } from '../../../services/mysql/system/sys.service';
import { fetchProjectVersions } from '../../../services/github/version.service';
import { fetchDiscordClientUser } from '../../../services/discord/user.service';
import * as Typings from '../../../@types/sys'

export const getWebStats = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
): Promise<Typings.WebsiteStats> => await getWebsiteStats();

export const getProjectVersions = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
): Promise<Typings.ProjectVersions> => await fetchProjectVersions();

export const getTeamList = async (
    req: FastifyRequest,
    reply: FastifyReply<ServerResponse>
): Promise<Typings.TeamList> => await fetchDiscordClientUser({ req: req });
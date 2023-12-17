import { get8BallResponse, getAdvice } from "./client/client.controller";
import { getWebStats, getProjectVersions, getTeamList } from "./system/sys.controller";
import { getUserStates, getDiscordUser, getUserBuckets, getUserImage } from "./users/user.controller";
import { statusCompFilter, statusSummary, pageComponents } from "./status/status.controller";

export const v3Controllers = {
    getAdvice,
    get8BallResponse,
    getWebStats,
    getProjectVersions,
    getTeamList,
    getUserStates,
    getDiscordUser,
    getUserBuckets,
    getUserImage,
    statusCompFilter,
    statusSummary,
    pageComponents
};
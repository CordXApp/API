import { getWebsiteStats } from "./mysql/mysql.service";
import { fetch8BallResponse, fetchAdvice } from "./client/fun.service";
import { fetchProjectVersions } from "./github/github.service";
import { fetchDiscordUser, fetchClientUser } from "./discord/user.service";
import { fetchUserBucket, fetchUserImage } from "./spaces/spaces.service";
import { fetchUserStates } from "./mongo/mongo.service";
import { statusCompFilter, statusSummary, pageComponents } from "./status/status.service";

const v3Services = {
    getWebsiteStats,
    fetchAdvice,
    fetch8BallResponse,
    fetchProjectVersions,
    fetchDiscordUser,
    fetchClientUser,
    fetchUserBucket,
    fetchUserImage,
    fetchUserStates,
    statusCompFilter,
    statusSummary,
    pageComponents
};

export default v3Services;
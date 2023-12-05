import userRoutes from "./users/router";
import sysRoutes from "./system/router";
import clientRoutes from "./client/router";

/**
 * ALL API V3 ROUTES GO HERE
 */

const v3Routes = [...sysRoutes, ...userRoutes, ...clientRoutes];

export default v3Routes;
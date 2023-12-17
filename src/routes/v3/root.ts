import userRoutes from "./users/router";
import sysRoutes from "./system/router";
import clientRoutes from "./client/router";
import statusRoutes from "./status/router";

/**
 * ALL API V3 ROUTES GO HERE
 */

const v3Routes = [...sysRoutes, ...userRoutes, ...clientRoutes, ...statusRoutes];

export default v3Routes;
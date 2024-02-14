import home from "./base/router";
import v3Routes from "./root";

/**
 * PLACE ALL ROUTES HERE
 */

const routes = [...home, ...v3Routes];

export default routes;

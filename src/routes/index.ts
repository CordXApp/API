import home from "./base/router";
import v3Routes from "./v3/root";

const routes = [...home, ...v3Routes];

export default routes;

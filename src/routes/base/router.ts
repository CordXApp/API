import * as controller from '../../controllers/home/cordx.controller';
import { RouteOptions } from "fastify";


const base: RouteOptions = {
    method: "GET",
    url: "/",
    handler: controller.homePage
};

const homeRoutes: any[] = [base];

export default homeRoutes
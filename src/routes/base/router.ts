import * as controller from '../../controllers/home/cordx.controller';
import { RouteOptions } from "fastify";


const base: RouteOptions = {
    method: "GET",
    url: "/",
    handler: controller.homePage
};

const v3HomePage: RouteOptions = {
    method: "GET",
    url: "/v3",
    handler: controller.homePage
};

const v4HomePage: RouteOptions = {
    method: "GET",
    url: "/v4",
    handler: controller.homePage
};

const homeRoutes: any[] = [
    base,
    v3HomePage,
    v4HomePage
];

export default homeRoutes
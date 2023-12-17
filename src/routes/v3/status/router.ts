import { v3Controllers } from '../../../controllers/v3/base.controller';
import userDocs from '../../../docs/users/index';
import { RouterTypes } from "../../../@types/base";

const statusCompFilter: RouterTypes = {
    method: "GET",
    url: "/v3/status/comp/filter/:secret",
    handler: v3Controllers.statusCompFilter,
};

const statusSummary: RouterTypes = {
    method: "GET",
    url: "/v3/status/summary",
    handler: v3Controllers.statusSummary,
};

const pageComponents: RouterTypes = {
    method: "GET",
    url: "/v3/status/components/:secret",
    handler: v3Controllers.pageComponents,
}

const statusRoutes: any[] = [statusCompFilter, statusSummary, pageComponents]

export default statusRoutes
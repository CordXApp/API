import { RouterTypes } from '../../../@types/base';
import * as controller from '../../../controllers/v3/system/sys.controller';
import systemDocs from '../../../docs/system/index';

const getWebsiteStats: RouterTypes = {
    method: 'GET',
    url: '/v3/system/stats',
    handler: controller.getWebStats
};

const getProjectVersions: RouterTypes = {
    method: 'GET',
    url: '/v3/system/versions',
    handler: controller.getProjectVersions
};

const getTeamList: RouterTypes = {
    method: 'GET',
    url: '/v3/system/team',
    handler: controller.getTeamList,
    schema: systemDocs.team
}

const sysRoutes: any[] = [
    getWebsiteStats,
    getProjectVersions,
    getTeamList
];


export default sysRoutes
import { RouterTypes } from '../../@types/base';
import { v3Controllers } from '../../controllers/v3/base.controller';
import systemDocs from '../../docs/system/index';

const getWebsiteStats: RouterTypes = {
    method: 'GET',
    url: '/system/stats',
    handler: v3Controllers.getWebStats
};

const getProjectVersions: RouterTypes = {
    method: 'GET',
    url: '/system/versions',
    handler: v3Controllers.getProjectVersions
};

const getTeamList: RouterTypes = {
    method: 'GET',
    url: '/system/team',
    handler: v3Controllers.getTeamList,
    schema: systemDocs.team
}

const sysRoutes: any[] = [
    getWebsiteStats,
    getProjectVersions,
    getTeamList
];


export default sysRoutes
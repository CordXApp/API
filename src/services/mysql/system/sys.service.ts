import boom from "boom";
import sqlQuery from '../../../clients/mysql.client';
import { WebsiteStats } from '../../../@types/sys'

export const getWebsiteStats = async (): Promise<any> => {

    try {

        let users = await sqlQuery(`SELECT * FROM users`, []).then((res: any) => res.length);
        let images = await sqlQuery(`SELECT * FROM images`, []).then((res: any) => res.length);
        let downloads = await sqlQuery(`SELECT * FROM downloads`, []).then((res: any) => res.length);

        let output = {
            users: users,
            images: images,
            downloads: downloads
        };


        return output as WebsiteStats;

    } catch (e: any) {

        return boom.boomify(e, { statusCode: 500 });
    }
}
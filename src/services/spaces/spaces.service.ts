import boom from "boom";
import * as Typings from "../../@types/users"
import sqlQuery from "../../clients/mysql.client";
import { getUserBucketSize } from "../../middleware/spaces";
import { getUserImage } from "../../middleware/spaces";
import formatSizeUnits from "../../utils/formatSizeUnits";
import { fetchV3DiscordUser } from "../discord/user.service";
import { FileTypes } from '../../@types/spaces'

//import { QueryResponse } from 'serverless-mysql';

export const fetchUserBucket = async ({ req, res }): Promise<Typings.UserStats> => {

    res.header('Content-Type', 'application/json');

    const { userId } = await req.params;

    if (!userId) throw boom.badRequest('Invalid user id');

    return await getUserBucketSize({ user: userId }).then(async (b: any) => {

        const images: any = await sqlQuery(`SELECT * FROM images WHERE userid=?`, [userId]).then((res) => res);
        const downloads: any = await sqlQuery(`SELECT * FROM downloads WHERE user=?`, [userId]).then((res) => res);

        const png = await images.filter((i) => i.filename.includes('.png'));
        const gif = await images.filter((i) => i.filename.includes('.gif'));
        const mp4 = await images.filter((i) => i.filename.includes('.mp4'));
        const webm = await images.filter((i) => i.filename.includes('.webm'));
        const jpg = await images.filter((i) => i.filename.includes('.jpg'));
        const jpeg = await images.filter((i) => i.filename.includes('.jpeg'));
        const size = b.error ? '0 Bytes' : await formatSizeUnits({ bytes: b.size });

        return {
            id: `${userId}`,
            username: `${(await fetchV3DiscordUser({ id: userId })).global_name}`,
            storage: {
                used: size,
                remains: 'Unlimited',
            },
            files: {
                images: images.length ? images.length : 0,
                downloads: downloads.length ? downloads.length : 0,
            },
            types: {
                image: {
                    "image/png": png.length ? png.length : 0,
                    "image/gif": gif.length ? gif.length : 0,
                    "image/jpg": jpg.length ? jpg.length : 0,
                    "image/jpeg": jpeg.length ? jpeg.length : 0
                },
                video: {
                    "video/mp4": mp4.length ? mp4.length : 0,
                    "video/webm": webm.length ? webm.length : 0,
                }
            }
        }
    }).catch((err: any) => {

        throw boom.internal(err, { statusCode: 500 });
    });
}

export const fetchUserImage = async ({ req, res }): Promise<any> => {

    res.header('Content-Type', 'application/json');

    const { userId, imageId } = await req.params;

    if (!userId) throw boom.badRequest('Invalid user id', { statusCode: 400 });
    if (!imageId) throw boom.badRequest('Invalid image id', { statusCode: 400 });

    const data: any = await sqlQuery(`SELECT * FROM images WHERE userid="${userId}" AND fileid="${imageId}"`, []).then(res => res);

    if (!data.length || !data) throw boom.notFound('Unable to locate the provided image in our database', { statusCode: 404 });

    const image: any = await getUserImage({ user: userId, image: data[0].filename });

    if (image.error) throw boom.internal('Error' + image.message, { statusCode: 500 });

    const file_type = data[0].filename.split('.')[1];

    let custom;

    if (file_type.includes('png')) custom = FileTypes[0].text;
    if (file_type.includes('jpg')) custom = FileTypes[1].text;
    if (file_type.includes('jpeg')) custom = FileTypes[2].text;
    if (file_type.includes('gif')) custom = FileTypes[3].text;
    if (file_type.includes('webm')) custom = FileTypes[4].text;
    if (file_type.includes('mp4')) custom = FileTypes[5].text;

    return {
        file: {
            owner: (await fetchV3DiscordUser({ id: userId })).global_name,
            info: {
                id: data[0].fileid,
                type: custom ? custom : file_type,
                name: data[0].filename,
                url: `https://beta.cordx.lol/api/user/${userId}/${data[0].filename}`,
            },
            stats: {
                key: image.data[0].Key,
                modified: image.data[0].LastModified,
                size: await formatSizeUnits({ bytes: image.data[0].Size }),
                class: image.data[0].StorageClass,
            }
        }
    }
}
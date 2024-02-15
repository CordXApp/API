import { boomify } from 'boom';
import env from '../../settings/server.cfg';
import { S3 } from '@aws-sdk/client-s3';

export async function getUserBucketSize({ user }) {

    const data = await getBucketSizeFromFiles({ user: user }).catch((err: Error) => {
        console.error(err.stack);

        return boomify(err, { statusCode: 500 })
    })

    return data;
}

export async function getUserImage({ user, image }) {
    const data = await getImageFromBucket({ user: user, image: image });

    return data;
}

export async function getBucketSizeFromFiles({ user }) {

    return new Promise(async resolve => {
        const bucketParams = {
            Bucket: env.BUCKETS.NAME,
            Key: `${user}/`
        }

        const space = new S3({
            region: 'us-east-1',
            endpoint: env.BUCKETS.CDNLINK,
            credentials: {
                accessKeyId: env.BUCKETS.KEYID,
                secretAccessKey: env.BUCKETS.SECRET
            }
        });

        space.listObjectsV2(bucketParams, (err, data) => {

            const valid = data.Contents.filter((i) => i.Key.includes(`${user}`));

            if (valid.length === 0) return resolve({ size: 0, error: true })

            if (err) return resolve(err.stack);

            else return resolve({ size: data.Contents.map(i => i.Size).reduce((a, b) => a + b), error: false });
        });
    })
}

export async function getImageFromBucket({ user, image }) {

    return new Promise(async resolve => {

        const bucketParams = {
            Prefix: `${user}/${image}`,
            Bucket: env.BUCKETS.NAME,
            Key: `${user}/${image}`
        };

        const space = new S3({

            forcePathStyle: false,
            endpoint: env.BUCKETS.CDNLINK,
            region: 'us-east-1',
            credentials: {
                accessKeyId: env.BUCKETS.KEYID,
                secretAccessKey: env.BUCKETS.SECRET
            }
        });

        await space.listObjectsV2(bucketParams, (err, data) => {

            if (err) return resolve({ error: true, message: err.stack });
            else return resolve({ data: data.Contents, error: false })
        });
    })
}
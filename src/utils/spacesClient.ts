import { S3 } from "@aws-sdk/client-s3";
import env from "../settings/server.cfg";

export class SpacesClient {
    private client: S3;

    constructor() {
        this.client = new S3({
            region: 'us-east-1',
            endpoint: env.BUCKETS.CDNLINK,
            credentials: {
                accessKeyId: env.BUCKETS.KEYID,
                secretAccessKey: env.BUCKETS.SECRET
            }
        });
    }

    public async getUserBucketSize(user: string) {
        return new Promise(async resolve => {
            const bucketParams = {
                Bucket: env.BUCKETS.NAME,
                Prefix: `${user}/`,
                Key: `${user}/`
            }

            this.client.listObjectsV2(bucketParams, (err, data) => {

                const valid = data.Contents.filter((i) => i.Key.includes(`${user}`));

                if (valid.length === 0) return resolve({ size: 0, error: true })

                if (err) return resolve(err.stack);

                else return resolve({ size: data.Contents.map(i => i.Size).reduce((a, b) => a + b), error: false });
            });
        });
    }

    public async getImageFromBucket(user: string, image: string) {
        return new Promise(async resolve => {

            const bucketParams = {
                Prefix: `${user}/${image}`,
                Bucket: env.BUCKETS.NAME,
                Key: `${user}/${image}`
            };

            this.client.getObject(bucketParams, (err, data) => {
                if (err) return resolve(err.stack);
                else return resolve(data);
            });
        });
    }
}
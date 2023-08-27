const { sqlQuery } = require('@controllers/sqlQuery.js');
const config = require('@configs/main');
const logs = require('@plugins/logger')
const { S3, ListObjectsCommand } = require('@aws-sdk/client-s3')

module.exports = async (fastify, opts) => {

    function formatSizeUnits(bytes) {
        if (bytes >= 1073741824) {
            bytes = (bytes / 1073741824).toFixed(2) + ' GB'
        } else if (bytes >= 1048576) {
            bytes = (bytes / 1048576).toFixed(2) + ' MB'
        } else if (bytes >= 1024) {
            bytes = (bytes / 1024).toFixed(2) + ' KB'
        } else if (bytes > 1) {
            bytes = bytes + ' bytes'
        } else if (bytes == 1) {
            bytes = bytes + ' byte'
        } else {
            bytes = '0 bytes'
        }
        return bytes
    }

    fastify.get('/:userId/stats', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let user = request.params.userId;

        const space = new S3({
            forcePathStyle: false,
            endpoint: process.env.DoCdnLink,
            region: 'us-east-1',
            credentials: {
                accessKeyId: process.env.DoKeyId,
                secretAccessKey: process.env.DoSecret
            }
        })

        let images = await sqlQuery({ query: `SELECT * FROM images WHERE userid="${user}"`}).then(i => i);
        let downloads = await sqlQuery({ query: `SELECT * FROM downloads WHERE user="${user}"` }).then(d => d)

        let png = await images.filter(v => v.filename.includes('.png'));
        let gif = await images.filter(v => v.filename.includes('.gif'));
        let mp4 = await images.filter(v => v.filename.includes('.mp4'));
        let other = await images.filter(v => !v.filename.includes('.png') && !v.filename.includes('.gif') && !v.filename.includes('.mp4'));

        let bucket = await space.send(new ListObjectsCommand({ Bucket: 'cordx', Key: `${user}` }));

        let size;

        if (bucket) size = await formatSizeUnits(bucket.Contents.length)
        else size = '0 bytes';

        return reply.code(200).send({
            storage: {
                used: `${size}`,
                remains: 'unlimited',
            },
            files: {
                images: images.length ? images.length : 0,
                downloads: downloads.length ? downloads.length : 0,
                png: png.length ? png.length : 0,
                gif: gif.length ? gif.length : 0,
                mp4: mp4.length ? mp4.length : 0,
                other: other.length ? other.length : 0,
            }
        })
    });

    fastify.get('/:userId/images/all', async (request, reply) => {

        reply.header('Content-Type', 'application/json');

        let user = request.params.userId;

        const space = new S3({
            forcePathStyle: false,
            endpoint: process.env.DoCdnLink,
            region: 'us-east-1',
            credentials: {
                accessKeyId: process.env.DoKeyId,
                secretAccessKey: process.env.DoSecret
            }
        })

        let bucket = await space.send(new ListObjectsCommand({ Bucket: 'cordx' }));
        let u_bucket = await bucket.Contents.filter((u) => u.Key.startsWith(`${user}`) && !u.Key.includes('.mp4'))

        if (!bucket) return reply.code(404).send({
            message: 'Bucket not found',
            status: 404 
        })



        return reply.code(200).send({
            images: u_bucket.splice(Math.floor(Math.random() * u_bucket.length), 9)
        })
    });
}
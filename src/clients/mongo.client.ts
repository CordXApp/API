import mongo from 'mongoose';
import env from '../settings/server.cfg';

mongo.set('strictQuery', false);

let cached = global.mongo;
if (!cached) cached = global.mongo = { conn: null, promise: null };

async function dbConnect() {

    if (cached.conn) return cached.conn;

    if (!cached.promise) {

        const opts = { bufferCommands: false };

        cached.promise = mongo.connect(env.DATABASES.MONGO, opts).then(mongoose => mongoose);
    }

    cached.conn = await cached.promise;

    return cached.conn;
}

export default dbConnect;
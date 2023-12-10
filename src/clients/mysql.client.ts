import env from "../settings/server.cfg";
import mysql from 'serverless-mysql';

async function sqlQuery(query: any, values?: any) {

    const db = mysql({
        config: {
            host: env.DATABASES.MYSQL.HOST,
            database: env.DATABASES.MYSQL.DB,
            user: env.DATABASES.MYSQL.USER,
            password: env.DATABASES.MYSQL.PASS

        }
    });

    try {

        const res = await db.query(query, values);

        await db.end();

        return res;

    } catch (err: any) {

        return console.log(err.stack);
    }
}

export default sqlQuery;
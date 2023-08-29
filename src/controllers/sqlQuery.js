const config = require('@configs/main')
const logs = require('@plugins/logger')
const mysql = require('serverless-mysql')

module.exports.sqlQuery = async function ({ query }) {
    const db = mysql({
        config: {
            host: config.sql.host,
            user: config.sql.user,
            password: config.sql.pass,
            database: config.sql.name
        }
    })

    try {
        const res = await db.query(query)

        await db.end()

        return res
    } catch (err) {
        return logs.send(`ERROR: ${err.stack}`, 'error')
    }
}

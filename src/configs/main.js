module.exports = {
    port: 4985,
    api: process.env.API_SECRET,
    token: process.env.BOT_TOKEN,
    github: process.env.GIT_TOKEN,
    status: process.env.STATUS_SECRET,
    sql: {
        name: process.env.SQL_NAME,
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        pass: process.env.SQL_PASS,
    }
}
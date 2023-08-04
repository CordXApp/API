module.exports = {
    port: 4223,
    token: process.env.BOT_TOKEN,
    github: process.env.GIT_TOKEN,
    sql: {
        name: process.env.SQL_NAME,
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        pass: process.env.SQL_PASS,
    }
}
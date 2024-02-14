const env: any = {
  APP: {
    PORT: 3000,
    DOMAIN: 'https://api.cordx.lol',
    SECRET: process.env.API_SECRET
  },
  BUCKETS: {
    NAME: process.env.BucketName,
    SECRET: process.env.DoSecret,
    CDNLINK: process.env.DoCdnLink,
    SHORTLINK: process.env.DoShortLink,
    KEYID: process.env.DoKeyId
  },
  DISCORD: {
    API_KEY: process.env.DISCORD_API_KEY,
    PROXY: process.env.DISCORD_PROXY_URL,
  },
  DATABASES: {
    MONGO: process.env.MONGO_URI,
    REDIS: process.env.REDIS_URI,
    MYSQL: {
      HOST: process.env.SQL_HOST,
      USER: process.env.SQL_USER,
      PASS: process.env.SQL_PASS,
      DB: process.env.SQL_NAME
    }
  },
  FORMAL: {
    MULTI: true,
    ENCODED: true
  },
  GITHUB: {
    TOKEN: process.env.GIT_TOKEN
  },
  GUILD: {
    id: '871204257649557604',
    invite: 'https://discord.gg/3KxYUAM4jA',
    roles: {
      staff: '1138246343412953218',
      developer: '871275407134040064'
    },
  },
  STATUS: {
    SECRET: process.env.STATUS_SECRET,
    MONITOR: process.env.STATUS_MONITOR,
    KEY: process.env.STATUS_KEY,
    UR: process.env.UPTIME_ROBOT
  },
};

export default env;

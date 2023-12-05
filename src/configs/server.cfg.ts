const env: any = {
  APP: {
    PORT: 3000,
    DOMAIN: 'https://api.cordx.lol',
    SECRET: process.env.API_SECRET
  },
  DISCORD: {
    API_KEY: process.env.DISCORD_API_KEY,
    API_URL: 'https://discord.com/api/v9/',
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
  }
};

export default env;

require('dotenv').config();

export default {
  postgresHost: process.env.POSTGRES_HOST,
  postgresPort: process.env.POSTGRES_PORT,
  postgresUser: process.env.POSTGRES_USER,
  postgresPassword: process.env.POSTGRES_PASSWORD,
  postgresDatabase: process.env.POSTGRES_DATABASE,
  port: process.env.PORT,
  databaseType: process.env.DATABASE_TYPE,
  jwtSecret: process.env.JWT_SECRET,
};

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const NODE_ENV = process.env.NODE_ENV || 'development';

if (!DB_HOST || !DB_PORT || !DB_USERNAME || !DB_PASSWORD || !DB_DATABASE) {
  throw new Error('Database environment variables are not properly configured');
}

console.log(`Connecting to PostgreSQL at ${DB_HOST}:${DB_PORT}/${DB_DATABASE} in ${NODE_ENV} mode.`);

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: parseInt(DB_PORT),
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

export default sequelize;
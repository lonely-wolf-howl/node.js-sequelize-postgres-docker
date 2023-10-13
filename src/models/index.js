const Sequelize = require('sequelize');

// .env
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  DATABASE: 'postgres',
  USER: process.env.POSTGRES_USER,
  PASSWORD: process.env.POSTGRES_PASSWORD,
  HOST: process.env.POSTGRES_HOST,
  PORT: Number(process.env.POSTGRES_PORT),
  DIALECT: 'postgres',
};

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.DIALECT,
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./user.model')(sequelize, Sequelize);

module.exports = db;

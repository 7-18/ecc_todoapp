import Sequelize from "sequelize";
import { config } from "dotenv";

config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_INSTANCE_HOST, DB_PORT } =
  process.env;

export const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_INSTANCE_HOST,
  port: DB_PORT || 5432,
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

import Sequelize from "sequelize";
import { config } from "dotenv";

config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_INSTANCE_HOST } = process.env;

export const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_INSTANCE_HOST,
  dialect: "postgres",
});

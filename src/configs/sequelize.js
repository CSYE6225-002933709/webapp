import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config(); // Load .env file

const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// TODO : implement .env
const connection = await mysql.createConnection({
  user: userName,
  password: password,
});

await connection.query("CREATE DATABASE IF NOT EXISTS saiDB;");

const sequelize = new Sequelize("saiDB", userName, password, {
  host: "127.0.0.1",
  dialect: "mysql",
});

export default sequelize;

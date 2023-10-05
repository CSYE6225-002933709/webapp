import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config(); // Load .env file

var userName, password;

if (process.env.DB_USERNAME === '') {
  
  userName = "root";
  password = "root";

} else {

  userName = process.env.DB_USERNAME;
  password = process.env.DB_PASSWORD;
}


// TODO : implement .env
const connection = await mysql.createConnection({
  user: userName,
  password: password,
});

await connection.query("CREATE DATABASE IF NOT EXISTS saiDB;").catch((err) => {
  
  console.log(err);
});

const sequelize = new Sequelize("saiDB", userName, password, {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;

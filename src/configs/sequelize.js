import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

const userName = process.env.DB_USERNAME || "root";
const password = process.env.DB_PASSWORD || "root";

var sequelize = null;

const createSequelizeInstance = () => {
    
  sequelize = new Sequelize("saiDB", userName, password, {
  host: "127.0.0.1",
  dialect: "mysql",
  });
};

await mysql
  .createConnection({
    user: userName,
    password: password,
  })
  .then(async (connection) => {
    await connection.query("CREATE DATABASE IF NOT EXISTS saiDB;")
    .then(async () => {
      await createSequelizeInstance();
    });
    })
  .catch((err) => console.log(err));
  
  

export default sequelize;

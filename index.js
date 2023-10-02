import { init_user_data, read_csv } from './src/services/csv-helper.js';
import { Sequelize } from "sequelize";
import express from 'express';
import cors from "cors";

const PORT = 8080;

var app = express();
app.use(cors({ origin: "*" }));

init_user_data("./user.csv");   

app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
});
import { Sequelize } from "sequelize";

const db = new Sequelize('your_db', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;
// config/database.js
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    logging: false,
  }
);

// Función para probar la conexión (opcional, la llamas desde app.js)
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a PostgreSQL exitosa");
  } catch (err) {
    console.error("Error de conexión:", err);
  }
};

export default sequelize;
// config/database.js

import { Sequelize } from "sequelize";

const connectionString = process.env.DATABASE_URL;

const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  logging: false,
  // Opciones adicionales para SSL/TLS, cruciales para bases de datos en la nube
  dialectOptions: {
    ssl: {
      require: true, // Requerir SSL
      rejectUnauthorized: false, // Ignorar error de certificado autofirmado (común en proveedores de nube)
    },
  },
});

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

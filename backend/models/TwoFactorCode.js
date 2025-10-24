// models/TwoFactorCode.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

  const TwoFactorCode = sequelize.define("TwoFactorCode", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiracion: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });



export default TwoFactorCode;
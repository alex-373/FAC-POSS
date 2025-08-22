// backend/models/Sale.js
module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define("Sale", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "customers",  // 👈 tabla de clientes
        key: "id"            // 👈 campo con el que se relaciona
      },
      field: "customer_id"   // 👈 así se guarda en BD (más estándar en SQL)
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: "sales",
    timestamps: true
  });

  // Relaciones
  Sale.associate = (models) => {
    Sale.belongsTo(models.Customer, {
      foreignKey: "customerId",
      as: "customer"
    });
  };

  return Sale;
};

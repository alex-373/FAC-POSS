// backend/models/Supplier.js
module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('Supplier', {
    name:    { type: DataTypes.STRING, allowNull: false },
    contact: { type: DataTypes.STRING },
    address: { type: DataTypes.TEXT }
  }, {
    tableName: 'suppliers',
    underscored: true,
    timestamps: true
  });

  Supplier.associate = (models) => {
    Supplier.hasMany(models.Product, {
      foreignKey: 'supplier_id',
      as: 'products'
    });
  };

  return Supplier;
};

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    documento: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Email no válido'
        }
      }
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'customers',
    underscored: true,
    timestamps: true
  });

  return Customer;
};

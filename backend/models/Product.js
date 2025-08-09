const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  name: { 
    type: DataTypes.STRING, 
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "El nombre del producto no puede estar vacío"
      },
      len: {
        args: [2, 100],
        msg: "El nombre debe tener entre 2 y 100 caracteres"
      }
    }
  },
  description: { 
    type: DataTypes.TEXT,
    validate: {
      len: {
        args: [0, 500],
        msg: "La descripción no puede exceder 500 caracteres"
      }
    }
  },
  barcode: { 
    type: DataTypes.STRING, 
    unique: {
      msg: "Este código de barras ya está registrado"
    },
    validate: {
      isAlphanumeric: {
        msg: "El código de barras solo puede contener letras y números"
      }
    }
  },
  sku: { 
    type: DataTypes.STRING, 
    unique: {
      msg: "Este SKU ya está en uso"
    }
  },
  quantity: { 
    type: DataTypes.INTEGER, 
    defaultValue: 0,
    validate: {
      min: {
        args: [0],
        msg: "El stock no puede ser negativo"
      }
    }
  },
  unit: { 
    type: DataTypes.STRING, 
    defaultValue: 'unidades',
    validate: {
      isIn: {
        args: [['unidades', 'cajas', 'kg', 'litros']],
        msg: "Unidad de medida no válida"
      }
    }
  },
  unit_cost: { 
    type: DataTypes.FLOAT, 
    allowNull: false,
    validate: {
      isFloat: {
        msg: "El costo debe ser un número válido"
      },
      min: {
        args: [0.01],
        msg: "El costo unitario debe ser mayor a 0"
      }
    }
  },
  sale_price: { 
    type: DataTypes.FLOAT,
    validate: {
      isFloat: {
        msg: "El precio de venta debe ser un número válido"
      },
      min: {
        args: [0.01],
        msg: "El precio de venta debe ser mayor a 0"
      }
    } 
  },
  purchase_date: { 
    type: DataTypes.DATEONLY,
    validate: {
      isDate: {
        msg: "Fecha de compra no válida"
      },
      isBefore: {
        args: [new Date().toISOString()],
        msg: "La fecha de compra no puede ser futura"
      }
    }
  },
  expiry_date: { 
    type: DataTypes.DATEONLY,
    validate: {
      isDate: {
        msg: "Fecha de vencimiento no válida"
      },
      isAfterPurchase(value) {
        if (value && this.purchase_date && new Date(value) <= new Date(this.purchase_date)) {
          throw new Error("La fecha de vencimiento debe ser posterior a la de compra");
        }
      }
    }
  },
  supplier_id: { 
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  hooks: {
    beforeSave: async (product) => {
      // Validación adicional de proveedor
      const supplier = await sequelize.models.Supplier.findByPk(product.supplier_id);
      if (!supplier) {
        throw new Error("El proveedor especificado no existe");
      }
    }
  },
  indexes: [
    {
      unique: true,
      fields: ['barcode']
    },
    {
      unique: true,
      fields: ['sku']
    },
    {
      fields: ['supplier_id']
    }
  ]
});

// Relación con Proveedor (configurada después de definir el modelo)
Product.associate = function(models) {
  Product.belongsTo(models.Supplier, {
    foreignKey: 'supplier_id',
    as: 'supplier',
    onDelete: 'RESTRICT' // Evita borrar proveedor si tiene productos
  });
};

module.exports = Product;
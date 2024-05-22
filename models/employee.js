const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Role = require('./role')

class Employee extends Model {}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: 'id',
      },
    },
    manager: {
      type: DataTypes.STRING,
      allowNull: false,

    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Employee',
  }
);

Employee.associate = (models) => {
    Employee.belongsTo(models.Role, {
      foreignKey: 'roleId',
      as: 'role', 
    });
  };
  

module.exports = Employee;

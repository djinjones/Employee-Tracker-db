const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Department = require('./department');
const Employee = require('./employee'); 

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Department,
        key: 'id',
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Role',
  }
);

Role.associate = (models) => {

  Role.belongsTo(models.Department, {
    foreignKey: 'departmentId',
    as: 'department', 
  });


  Role.hasMany(models.Employee, {
    foreignKey: 'roleId',
    as: 'employees',
  });
};

module.exports = Role;
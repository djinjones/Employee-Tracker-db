const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Role = require('./role');

class Department extends Model {}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Department',
  }
);

Department.associate = (models) => {
  Department.hasMany(models.Role, {
    foreignKey: 'departmentId',
    as: 'roles', 
  });
};

module.exports = Department;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bi: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    access_level: {
      type: DataTypes.ENUM('admin', 'manager'),
      allowNull: false
    }
  }, {
    tableName: 'users',
    timestamps: true
  });

  module.exports = User;
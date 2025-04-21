const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

    const Log = sequelize.define('Log', {
      user: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      entity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      entityId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    });
  
    module.exports = Log;
  
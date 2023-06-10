"use strict";
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("stocks", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stock_ids: {
        type: DataTypes.TEXT, // Assuming stock_ids are integers
    allowNull: true,
    defaultValue: []
      },
    createdAt: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  });

  User.beforeCreate(async (user) => {
    user.dataValues.createdAt = moment().unix();
    user.dataValues.updatedAt = moment().unix();
  });
  User.beforeUpdate(async (user) => {
    user.dataValues.updatedAt = moment().unix();
  });

  return User;
};
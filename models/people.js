"use strict";
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const People = sequelize.define("peoples", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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

  People.associate = (models) => {
    People.hasMany(models.Addresses, {
      foreignKey: "peopleId",
    });
  }
  People.beforeCreate(async (user) => {
    user.dataValues.createdAt = moment().unix();
    user.dataValues.updatedAt = moment().unix();
  });
  People.beforeUpdate(async (user) => {
    user.dataValues.updatedAt = moment().unix();
  });

  return People;
};
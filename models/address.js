"use strict";
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("addresses", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    personId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'peoples',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

  Address.associate = (models) => {
    Address.belongsTo(models.Peoples, {
      foreignKey: "peopleId",
    });
  }
  Address.beforeCreate(async (user) => {
    user.dataValues.createdAt = moment().unix();
    user.dataValues.updatedAt = moment().unix();
  });
  Address.beforeUpdate(async (user) => {
    user.dataValues.updatedAt = moment().unix();
  });

  return Address;
};
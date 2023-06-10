/* eslint-disable no-unused-vars */
const { sequelize } = require('../models');

module.exports = {
    peopleWithAddress: async (req, res) => {
      try {
        const query = `
          SELECT Peoples.*, COUNT(Addresses.id) AS address_count
          FROM Peoples
          LEFT JOIN Addresses ON Peoples.id = Addresses.personId
          GROUP BY Peoples.id, Addresses.id;
        `;
        const [results, _] = await sequelize.query(query);
        return res.status(200).send(results);
      } catch (err) {
        console.log(err);
        return res.status(err.status || 500).send(err.message || "Something went wrong!");
      }
    },
    peopleWithoutAddress: async (req, res) => {
      try {
        const query = `
          SELECT *
          FROM Peoples
          WHERE Peoples.id NOT IN (
            SELECT personId FROM Addresses
          );
        `;
        const [results, _] = await sequelize.query(query);
        return res.status(200).send(results);
      } catch (err) {
        console.log(err);
        return res.status(err.status || 500).send(err.message || "Something went wrong!");
      }
    },
    peopleWithDuplicateAddress: async (req, res) => {
      try {
        const query = `
          SELECT address, COUNT(address) AS iteration_count
          FROM Addresses
          GROUP BY address
          HAVING iteration_count > 1;
        `;
        const [results, _] = await sequelize.query(query);
        return res.status(200).send(results);
      } catch (err) {
        console.log(err);
        return res.status(err.status || 500).send(err.message || "Something went wrong!");
      }
    }
  };
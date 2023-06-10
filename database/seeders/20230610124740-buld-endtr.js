'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('peoples', [
      { name: 'John', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Alice', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Bob', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Emma', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Michael', createdAt: new Date(), updatedAt: new Date() },
    ]);

    const people = await queryInterface.sequelize.query(
      'SELECT id from peoples;'
    );

    const personRows = people[0];
    console.log(personRows)

    const personAddresses = [
      { address: '123 Main St', personId: personRows[0].id, createdAt: new Date(), updatedAt: new Date() },
      { address: '456 Elm St', personId: personRows[0].id, createdAt: new Date(), updatedAt: new Date() },
      { address: '789 Oak St', personId: personRows[1].id, createdAt: new Date(), updatedAt: new Date() },
      { address: '987 Pine St', personId: personRows[2].id, createdAt: new Date(), updatedAt: new Date() },
      { address: '555 Maple St', personId: personRows[3].id, createdAt: new Date(), updatedAt: new Date() },
    ];

    return queryInterface.bulkInsert('addresses', personAddresses);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('addresses', null, {});
    await queryInterface.bulkDelete('peoples', null, {});
  }
};
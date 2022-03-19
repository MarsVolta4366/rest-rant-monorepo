'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      first_name: 'Derek',
      last_name: 'Slauson',
      email: 'admin@example.com',
      created_at: new Date(),
      updated_at: new Date(),
      password_digest: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12),
      role: 'admin'
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', {
      email: 'admin@example.com'
    })
  }
};

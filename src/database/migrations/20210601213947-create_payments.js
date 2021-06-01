'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.createTable('payments', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        card_number: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        card_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        card_csc: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        card_expiry_date: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        user_id :{
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('payments');
  }
};

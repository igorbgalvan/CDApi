const { Model, DataTypes } = require('sequelize');

class Payment extends Model {
  static init(sequelize) {
    super.init({
      card_number: DataTypes.STRING,
      card_name: DataTypes.STRING,
      card_csc: DataTypes.STRING,
      card_expiry_date: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user_payment" })
  }
}
module.exports = Payment;
const { Model, DataTypes } = require('sequelize');

class Order extends Model {
  static init(sequelize) {
    super.init({
      status: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user_orders" })
    this.belongsTo(models.Product, { foreignKey: "product_id", as: "product_orders" })
  }
}
module.exports = Order;
const { Model, DataTypes } = require('sequelize');

class Category extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsToMany(models.Product, { foreignKey: "product_id", through: "product_categories", as: "products" })
  }
}
module.exports = Category;
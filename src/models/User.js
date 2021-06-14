const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          min: 6
        }
      },
      role: DataTypes.INTEGER,
    }, {
      hooks: {
        beforeValidate: async (user, options) => {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      sequelize
    })
  }

  static generateJwt(user) {
    return jwt.sign({ id: user.id }, process.env.API_SALT, {
      expiresIn: "15m"
    });
  }

  static associate(models) {
    this.hasOne(models.Payment, { foreignKey: "user_id", as: "payment" })
    this.hasOne(models.Address, { foreignKey: "user_id", as: "address" })
  }
}
module.exports = User;
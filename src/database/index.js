const Sequelize = require('sequelize');
const postgres = require('../database/config');

const User = require('../models/User');
const Address = require('../models/Address');
const Category = require('../models/Category');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const Product = require('../models/Product');

const conn = new Sequelize(postgres);


User.init(conn);
Address.init(conn);
Category.init(conn);
Order.init(conn);
Payment.init(conn);
Product.init(conn);


User.associate(conn.models);
Address.associate(conn.models);
Category.associate(conn.models);
Order.associate(conn.models);
Payment.associate(conn.models);
Product.associate(conn.models);


module.exports = conn;
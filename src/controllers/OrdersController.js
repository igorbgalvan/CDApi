const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const Address = require("../models/Address");
const Payment = require("../models/Payment");

module.exports = {
  async store(req, res) {
    try {
      const user_id = req.id;
      const { product_id } = req.params;
      const { status } = req.body;

      const user = await User.findByPk(user_id);
      if (!user)
        return res.status(400).send({ error: "user not found." });

      const product = await Product.findByPk(product_id);
      if (!product)
        throw new Error("product not found.");

      const order = await Order.create({ user_id, product_id, status });

      return res.status(200).send(order);

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  async index(req, res) {
    try {
      const orders = await Order.findAll();
      return res.status(200).send(orders);

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  async get(req, res) {
    try {
      const { id } = req.params;

      const order = await Order.findAll({
        where: { id },
        include: [
          {
            model: User, as: "user_orders", attributes: ["name", "email"],
            include: [
              {
                model: Address, as: "address", attributes: ["zip_code", "number", "details"]
              },
              {
                model: Payment, as: "payment", attributes: ["card_number", "card_name", "card_expiry_date"]
              }
            ]
          },
          {
            model: Product, as: "product_orders", attributes: ["name", "description"]
          },
        ],
      });

      if (!order)
        throw new Error("order not found.");

      return res.status(200).send(order);

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body

      const order = await Order.findByPk(id);

      if (!order)
        throw new Error("order not found.");

      await order.setAttributes({ status });
      await order.save();

      return res.status(200).send({ message: "order has been updated.", order });

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const order = await Order.findByPk(id);

      if (!order)
        throw new Error("order not found.");

      await order.destroy();

      return res.status(200).send({ message: "order has been deleted.", order });

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },
};
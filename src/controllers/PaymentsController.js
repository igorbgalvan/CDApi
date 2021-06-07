const Payment = require("../models/Payment");
const User = require("../models/User");

module.exports = {
  async get(req, res) {
    try {
      const { user_id } = req.params;
      const payment = await Payment.findOne({ where: { user_id }});

      if(!payment)
        throw new Error("payment not found.");

      return res.status(200).send(payment);

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  async store(req, res) {
    try {
      const { user_id } = req.params;
      const { card_number, card_name, card_csc, card_expiry_date } = req.body;

      const user = await User.findByPk(user_id);

      if(!user)
        throw new Error("user not found.");

      const payment = await Payment.create({ card_number, card_name, card_csc, card_expiry_date, user_id });
      return res.status(200).send(payment);

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const payment = await Payment.findByPk(id);

      if(!payment)
        throw new Error("payment not found.");

      payment.destroy();

      return res.status(200).send({message: "payment has been deleted", payment});

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },


  

  async index(req, res) {
    try {
      const { user_id } = req.params;
      const payment = await Payment.findAll({
        include: { association: 'user_payment'},
      });
      return res.status(200).send(payment);

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

};
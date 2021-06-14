const User = require("../models/User");

module.exports = {
  async store(req, res) {
    try {

      const { name, email, password, role } = req.body;
      const user = await User.create({ name, email, password, role });

      return res.status(201).send(user);

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  async index(req, res) {
    try {

      const user = await User.findAll();
      return res.status(200).send(user)

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const user = await User.findByPk(id);

      if (!user)
        return res.status(400).send({ error: "user not found." });

      await user.setAttributes({ name });
      await user.save();


      return res.status(200).send({ "message": "user has been updated", user});

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const user_id = req.id;
      const user = await User.findByPk(user_id);

      if (!user)
        return res.status(400).send({ error: "user not found." });

      await user.destroy();

      return res.status(200).send({ message: "your account has been deleted.", user: user });
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }

  },



};
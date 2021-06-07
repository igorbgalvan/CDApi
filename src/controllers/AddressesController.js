const { update } = require("../models/Address");
const Address = require("../models/Address");
const User = require("../models/User");

module.exports = {
    async get(req, res) {
        try {
            const { user_id } = req.params;
            const address = await Address.findOne({ where: { user_id } });

            if (!address)
                throw new Error("payment not found.");

            return res.status(200).send(address);

        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    },

    async store(req, res) {
        try {
            const { user_id } = req.params;
            const { zip_code, number, details } = req.body;

            const user = await User.findByPk(user_id);

            if (!user)
                throw new Error("user not found.");

            const address = await Address.create({ zip_code, number, details, user_id });
            return res.status(200).send(address);

        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    },

    async update(req, res){
        try {
            const { id } = req.params;
            const { zip_code, number, details } = req.body;
            const address = await Address.findByPk(id);

            if (!address)
                throw new Error("address not found.");

            await address.setAttributes({ zip_code, number, details });
            await address.save();

            return res.status(200).send({ message: "address has been updated", address });

        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const address = await Address.findByPk(id);

            if (!address)
                throw new Error("address not found.");

            address.destroy();

            return res.status(200).send({ message: "address has been deleted", address });

        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    },




    async index(req, res) {
        try {
            const { user_id } = req.params;
            const address = await Address.findAll({
                include: { association: 'user_address' },
            });
            return res.status(200).send(address);

        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    },

};
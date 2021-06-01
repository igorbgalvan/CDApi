const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
    async auth(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email: email } });

            if (user === null) {
                throw new Error('User not found.');
            }

            if (!await bcrypt.compare(password, user.password)) {
                throw new Error('Invalid password.');
            }

            const jwtToken = User.generateJwt(user);

            return res.status(200).send({ message: 'user has been logged', token: jwtToken });
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }
}
const Validate = require('../../../utils/bcrypt/validate');
const { config } = require('../../../config/index');
const UsersServices = require('../services/index');
const JWT = require('../../../utils/jwt/jwt');
const { sendEmailRegister } = require('../../../utils/nodemailer/nodemailer');
const { sendTwilioRegister } = require('../../../utils/twilio/twilio');

class AuthContoller {
	async getUser(req, res) {
		try {
			const token = req.headers.authorization;

			const decoded = await JWT.verifyToken(token, config.secret_key);

			const user = await UsersServices.findUser(decoded.id);

			if (!user) return res.status(401).json({ error: 'User not found' });

			return res.status(200).json(user);
		} catch (error) {
			console.log(error);
		}
	}
	async register(req, res) {
		try {
			const { name, password, email, address, phone, age, avatar } = req.body;

			const user = await UsersServices.findUserCompare(email);

			const id = user.userId ? user.userId + 1 : 1;

			if (user) {
				res.send(JSON.stringify({ error: 'email already exists' }));
			} else {
				const hash = Validate.createHash(password);
				const newUser = {
					name,
					password: hash,
					email,
					address,
					phone,
					age,
					avatar,
				};
				if (name === 'admin' && email === 'admin@gmail.com') {
					newUser.role = 'admin';
				} else {
					newUser.role = 'user';
				}
				await UsersServices.createUser(newUser);

				const userForToken = { id: id };

				const token = await JWT.generateToken(userForToken);

				await sendEmailRegister(newUser.name);
				await sendTwilioRegister(newUser.name);

				return res.status(200).json({ token });
			}
		} catch (error) {
			console.log(error);
		}
	}
	async login(req, res) {
		try {
			const { email, password } = req.body;

			const user = await UsersServices.findUserCompare(email);
			if (!user) return res.status(401).json({ error: 'User not found' });

			const matchPassword = await Validate.isValidPassword(password, user.password);

			if (!matchPassword)
				return res.status(401).json({ token: null, message: 'Wrong password' });

			const userForToken = { id: user.userId };

			const token = await JWT.generateToken(userForToken);

			return res.status(200).json({ token });
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new AuthContoller();

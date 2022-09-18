const jwt = require('jsonwebtoken');
let { config } = require('../../config/index');

class JWT {
	async generateToken(payload) {
		try {
			return await jwt.sign(payload, config.secret_key, { expiresIn: '24h' });
		} catch (error) {
			console.log(error);
		}
	}
	async decodedToken(token) {
		try {
			return await jwt.decode(token, config.secret_key);
		} catch (error) {
			console.log(error);
		}
	}

	async verifyToken(token) {
		try {
			return await jwt.verify(token, config.secret_key);
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new JWT();

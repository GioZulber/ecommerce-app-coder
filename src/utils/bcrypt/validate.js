const bcrypt = require('bcrypt');

const isValidPassword = async (password, userPassword) => {
	const match = await bcrypt.compare(password, userPassword);
	return match;
};

const createHash = (password) => {
	const hasheada = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
	return hasheada;
};

module.exports = {
	isValidPassword,
	createHash,
};

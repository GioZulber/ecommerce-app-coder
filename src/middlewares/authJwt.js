const JWT = require('../utils/jwt/jwt');
const User = require('../components/auth/services/index');

const verifyToken = async (req, res, next) => {
	try {
		const token = await req.headers.authorization;

		if (!token) return res.status(401).json({ error: 'No token provided' });

		const decoded = await JWT.verifyToken(token);

		req.id = decoded.id;

		const user = await User.findUser(req.id);

		if (!user) return res.status(401).json({ error: 'User not found' });

		await next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({ message: 'Invalid token' });
	}
};

const isAdmin = async (req, res, next) => {
	try {
		const user = await User.findUser(req.id);
		const { role } = user;
		if (role !== 'admin') return res.status(401).json({ error: 'You are not admin' });
		await next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({ message: 'Invalid token' });
	}
};

module.exports = {
	verifyToken,
	isAdmin,
};

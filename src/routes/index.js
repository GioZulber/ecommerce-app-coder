let authRoutes = require('../components/auth/authRouter');
let cartRoutes = require('../components/cart/cartRouter');
let productRoutes = require('../components/products/productRouter');

module.exports = (app) => {
	authRoutes(app);
	cartRoutes(app);
	productRoutes(app);
	app.get('/', (req, res) => {
		res.send('Funciona perfecto');
	});
};

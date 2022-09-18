const { Router } = require('express');
const CartController = require('./controller/CartController');
const { verifyToken } = require('../../middlewares/authJwt');

module.exports = (app) => {
	let router = new Router();
	app.use('/api/carts', router);

	router.post('/', verifyToken, CartController.setCart);
	router.delete('/:cid', verifyToken, CartController.deleteCart);
	router.get('/:cid/products', verifyToken, CartController.getCartProducts);
	router.post('/:cid/products', verifyToken, CartController.setProductToCart);
	router.delete('/:cid/products/:pid', verifyToken, CartController.deleteProductFromCart);
	router.get('/:cid/confirm', verifyToken, CartController.confirmCartOrder);
};

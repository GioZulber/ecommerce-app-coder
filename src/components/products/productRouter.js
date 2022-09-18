const { Router } = require('express');
const ProductController = require('./controller/productController');
const { verifyToken, isAdmin } = require('../../middlewares/authJwt');

module.exports = (app) => {
	let router = new Router();
	app.use('/api/products', router);

	router.get('/', verifyToken, ProductController.getProducts);
	router.get('/:pid?', verifyToken, ProductController.getProduct);
	router.post('/', [verifyToken, isAdmin], ProductController.setProduct);
	router.put('/:pid', [verifyToken, isAdmin], ProductController.updateProduct);
	router.delete('/:pid', [verifyToken, isAdmin], ProductController.deleteProduct);
};

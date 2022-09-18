const ProductModel = require('../services/index');

class ProductController {
	async getProduct(req, res) {
		try {
			const id = req.params.pid;
			const product = await ProductModel.getProduct(id);
			res.status(200).send({
				message: 'Producto encontrado',
				product: product,
			});
		} catch (error) {
			console.log(error);
		}
	}
	async getProducts(req, res) {
		try {
			const products = await ProductModel.getProducts();
			res.status(200).send({
				message: 'Productos encontrados',
				products: products,
			});
		} catch (error) {
			console.log(error);
		}
	}
	async setProduct(req, res) {
		try {
			const product = req.body;
			const newProduct = await ProductModel.setProduct(product);
			res.status(200).send({
				message: 'Producto agregado',
				newProduct: newProduct,
			});
		} catch (error) {
			console.log(error);
		}
	}
	async updateProduct(req, res) {
		try {
			const id = req.params.pid;
			const product = req.body;

			const findProduct = await ProductModel.getProducts(id);

			const updatedProduct = await ProductModel.updateProduct(id, product);

			if (updatedProduct !== findProduct) {
				res.status(200).send({
					message: 'Producto actualizado',
					updatedProduct: updatedProduct,
				});
			} else {
				res.status(400).send({
					message: 'El id del producto no puede ser nulo',
				});
			}
		} catch (error) {
			console.log(error);
		}
	}
	async deleteProduct(req, res) {
		try {
			const id = req.params.pid;

			const deletedProduct = await ProductModel.deleteProduct(id);
			if (id) {
				res.status(200).send({
					message: 'Producto eliminado',
					deletedProduct: deletedProduct,
				});
			} else {
				res.status(400).send({
					message: 'El id del producto no puede ser nulo',
				});
			}
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new ProductController();

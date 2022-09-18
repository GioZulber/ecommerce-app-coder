const CartsModel = require('../services/index');
const Users = require('../../auth/services/index');
const jwt = require('../../../utils/jwt/jwt');
const { sendOrderConfirm } = require('../../../utils/nodemailer/nodemailer');
const { sendTwilioOrderConfirm } = require('../../../utils/twilio/twilio');

class CartController {
	async setCart(req, res) {
		try {
			const { userId } = req.body;
			const newCart = await CartsModel.setCart(userId);
			res.status(200).send({
				message: 'Cart agregado',
				newCart: newCart,
			});
		} catch (error) {
			console.log(error);
		}
	}
	async deleteCart(req, res) {
		try {
			const id = req.params.cid;
			const deletedCart = await CartsModel.deleteCart(id);
			if (id) {
				res.status(200).send({
					message: 'Carrito eliminado',
					deletedCart: deletedCart,
				});
			} else {
				res.status(400).send({
					message: 'El id del cart no puede ser nulo',
				});
			}
		} catch (error) {
			console.log(error);
		}
	}
	async getCartProducts(req, res) {
		try {
			const id = req.params.cid;
			const productsCart = await CartsModel.getCartProducts(id);
			if (id) {
				res.status(200).send({
					message: 'Productos en el carrito',
					products: productsCart,
				});
			} else {
				res.status(400).send({
					message: 'El id del cart no puede ser nulo',
				});
			}
		} catch (error) {
			console.log(error);
		}
	}
	async setProductToCart(req, res) {
		try {
			const id = req.params.cid;
			const product = req.body;
			const newProduct = await CartsModel.setProductToCart(id, product);
			if (id) {
				res.status(200).send({
					message: 'Producto agregado',
					newProduct: newProduct,
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
	async deleteProductFromCart(req, res) {
		try {
			const cid = req.params.cid;
			const pid = req.params.pid;

			const deletedProduct = await CartsModel.deleteProductFromCart(cid, pid);
			if (cid && pid) {
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
	async confirmCartOrder(req, res) {
		try {
			const cid = req.params.cid;
			const token = req.headers.authorization;
			const cart = await CartsModel.getCart(cid);
			const decoded = await jwt.verifyToken(token);
			const user = await Users.findUser(decoded.email);

			if (cart) {
				const order = cart.products.map((product) => product.title);
				const total = cart.products.reduce((acc, product) => {
					return acc + product.price;
				}, 0);

				const bodyMail = `<h1>El usuario ${user.name} confirmo el pedido ${order}, con un total de $${total}.</h1>`;
				const bodyTwilio = `El usuario ${user.name} confirmo el pedido ${order}, con un total de $${total}.`;
				await sendOrderConfirm(bodyMail);
				await sendTwilioOrderConfirm(bodyTwilio);
				res.status(200).send({
					message: 'Pedido confirmado.',
				});
			}
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new CartController();

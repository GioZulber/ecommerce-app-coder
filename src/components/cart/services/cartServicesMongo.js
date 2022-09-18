const ContenedorMongo = require('../../../containers/ContainerMongoDb');
const cartSchema = require('../schema/cartSchema');

class CartsDaoMongo extends ContenedorMongo {
	constructor() {
		super(cartSchema, 'carts');
	}
	async getCart(id) {
		try {
			let data = await this.model.findOne({ id: id });

			if (data === null) {
				return null;
			} else {
				return data;
			}
		} catch (error) {
			console.log(`Could not get cart: ${error}`);
		}
	}
	async setCart(id) {
		try {
			let verify = await this.getCart(id);

			if (verify === null) {
				let date = new Date();
				const set = await this.model.create({
					id: id,
					timestamp: date,
					products: [],
				});
				return set;
			} else if (verify !== null && verify.id === id) {
				return { message: 'El carrito ya existe', data: verify };
			}
		} catch (error) {
			console.log(`Could not set cart: ${error}`);
		}
	}
	async deleteCart(id) {
		try {
			let res = await this.model.deleteOne({ id });
			return res;
		} catch (error) {
			console.log(`Could not delete cart: ${error}`);
		}
	}
	async getCartProducts(id) {
		try {
			let data = await this.getCart(id);
			if (id) {
				return data.products;
			} else {
				return data;
			}
		} catch (error) {
			console.log(`Could not get cart products: ${error}`);
		}
	}

	async setProductToCart(cid, product) {
		try {
			let cart = await this.getCart(cid);
			if (cart) {
				let isInCart = cart.products.some((prod) => prod.id === Number(product.id));

				if (isInCart) {
					cart.products.forEach((prod) => {
						if (prod.id === product.id) {
							prod.quantity += product.quantity;
						}
					});
				} else {
					cart.products.push(product);
				}
				await this.model.updateOne({ id: cid }, cart);

				return cart.products;
			} else {
				return { message: 'No existe el carrito' };
			}
		} catch (error) {
			console.log(`Could not set product to cart: ${error}`);
		}
	}
	async deleteProductFromCart(cid, pid) {
		try {
			let cart = await this.getCart(cid);
			if (cart) {
				cart.products = cart.products.filter((prod) => prod.productId !== Number(pid));
				//Eliminar producto del carrito
				await this.model.findOneAndUpdate({ productId: pid }, { products: cart.products });
				//Actualizar el carrito
				await this.model.updateOne({ id: Number(cid) }, cart);
				return cart.products;
			} else {
				return { message: 'No existe el carrito' };
			}
		} catch (error) {
			console.log(`Could not delete product from cart: ${error}`);
		}
	}
}

module.exports = new CartsDaoMongo();

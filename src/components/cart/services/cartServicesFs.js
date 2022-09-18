const ContainerFiles = require('../../../containers/ContainerFiles');
const { config } = require('../../../config/index');

class CartsServicesFs extends ContainerFiles {
	constructor() {
		super(config.path_to_cart_files);
	}

	async getCart(id) {
		try {
			let data = await this.getData();
			let cid = data.find((c) => c.id === Number(id));
			if (cid === undefined) {
				return { message: 'No existe el carrito' };
			} else {
				return cid;
			}
		} catch (error) {
			console.log(`Could not get cart: ${error}`);
		}
	}
	async setCart(id) {
		try {
			let data = await this.getData();

			let isInCart = data.some((c) => c.id === Number(id));

			if (isInCart) {
				return { message: 'El carrito ya existe' };
			}
			let date = new Date();
			let cart = {
				id: id,
				timestamp: date,
				products: [],
			};
			data.push(cart);
			let save = await this.setData(data);
			return save;
		} catch (error) {
			console.log(`Could not set cart: ${error}`);
		}
	}
	async deleteCart(id) {
		try {
			let data = await this.getData();
			data = data.filter((c) => c.id !== Number(id));
			let save = await this.setData(data);
			return save;
		} catch (error) {
			console.log(`Could not delete cart: ${error}`);
		}
	}
	async getCartProducts(id) {
		try {
			let data = await this.getData();
			if (id) {
				let cart = data.find((c) => c.id === Number(id));
				if (cart) {
					return cart.products;
				} else {
					return { message: 'No existe el carrito' };
				}
			} else {
				return data;
			}
		} catch (error) {
			console.log(`Could not get cart products: ${error}`);
		}
	}
	async setProductToCart(cid, product) {
		try {
			let data = await this.getData();
			let cart = data.find((c) => c.id === Number(cid));

			let isInCart = cart.products.some((prod) => prod.id === Number(product.id));

			let id = cart.products.length > 0 ? cart.products[cart.products.length - 1].id + 1 : 1;
			let date = new Date();
			let newProduct = {
				id: id,
				timestamp: date,
				quantity: product.quantity || 1,
			};
			if (isInCart) {
				cart.products.forEach((prod) => {
					if (prod.id === product.id) {
						prod.quantity += product.quantity;
					}
				});
			} else {
				cart.products.push(newProduct);
			}
			let save = await this.setData(data);
			return save;
		} catch (error) {
			console.log(`Could not set products in cart: ${error}`);
		}
	}
	async deleteProductFromCart(cid, pid) {
		try {
			let data = await this.getData();
			let cart = data.find((c) => c.id === Number(cid));
			if (cart) {
				cart.products = cart.products.filter((p) => p.id !== Number(pid));
			} else {
				return { message: 'No existe el carrito' };
			}
			let save = await this.setData(data);
			return save;
		} catch (error) {
			console.log(`Could not delete product from cart: ${error}`);
		}
	}
}

module.exports = new CartsServicesFs();

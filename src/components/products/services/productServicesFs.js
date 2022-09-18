const ContainerFiles = require('../../../containers/ContainerFiles');
const { config } = require('../../../config/index');

class ProductServiceFs extends ContainerFiles {
	constructor() {
		super(config.path_to_products_files);
	}

	async getProduct(id) {
		try {
			if (id) {
				return products.find((product) => product.id === Number(id));
			}
		} catch (error) {
			console.log(error);
		}
	}
	async getProducts() {
		try {
			const products = await this.getData();
			return products;
		} catch (error) {
			console.log(`Could not get products: ${error}`);
		}
	}
	async setProduct(product) {
		try {
			const products = await this.getData();

			let { title, description, code, thumbnail, price, stock } = product;
			if (
				title === undefined ||
				description === undefined ||
				code === undefined ||
				thumbnail === undefined ||
				price === undefined ||
				stock === undefined
			) {
				return console.log('Datos incompletos');
			}
			let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
			let date = new Date();
			const newProduct = {
				id,
				timestamp: date,
				title,
				description,
				code,
				thumbnail,
				price,
				stock,
			};
			products.push(newProduct);
			let save = await this.setData(products);
			return save;
		} catch (error) {
			console.log(`Could not set product: ${error}`);
		}
	}
	async updateProduct(pid, product) {
		try {
			const products = await this.getData();
			const pUpdate = products.find((p) => Number(p.id) === Number(pid));
			if (pUpdate) {
				let { title, description, code, thumbnail, price, stock } = product;

				if (
					title === undefined ||
					description === undefined ||
					code === undefined ||
					thumbnail === undefined ||
					price === undefined ||
					stock === undefined
				) {
					return console.log('Datos incompletos');
				}
				let date = new Date();
				pUpdate.id = Number(pid);
				pUpdate.title = title;
				pUpdate.timestamp = date;
				pUpdate.description = description;
				pUpdate.code = code;
				pUpdate.thumbnail = thumbnail;
				pUpdate.price = price;
				pUpdate.stock = stock;
				let save = await this.setData(products);
				return save;
			} else {
				return console.log('Producto no encontrado');
			}
		} catch (error) {
			console.log(`Could not update product: ${error}`);
		}
	}
	async deleteProduct() {
		try {
			let products = await this.getData();
			if (pid) {
				products = products.filter((p) => p.id !== Number(pid));
			} else {
				return { message: 'Producto no encontrado' };
			}
			let save = await this.setData(products);
			return save;
		} catch (error) {
			console.log(`Could not delete product: ${error}`);
		}
	}
}

module.exports = new ProductServiceFs();

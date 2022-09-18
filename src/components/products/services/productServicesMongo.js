const ContenedorMongo = require('../../../containers/ContainerMongoDb');
const productSchema = require('../schema/productSchema');

class ProductServiceMongo extends ContenedorMongo {
	constructor() {
		super(productSchema, 'products');
	}
	async getProduct(id) {
		try {
			if (id) {
				const res = await this.model.findOne({ productId: id });
				return res;
			}
		} catch (error) {
			console.log(error);
		}
	}
	async getProducts() {
		try {
			return await this.model.find({});
		} catch (error) {
			console.log(`Could not get products: ${error}`);
		}
	}
	async setProduct(product) {
		try {
			let lastId = await this.model.findOne({}, {}, { sort: { productId: -1 } });
			let id = lastId ? Number(lastId.productId) + 1 : 1;
			let date = new Date();
			const set = await this.model.create({
				productId: id,
				timestamp: date,
				...product,
			});
			console.log(set);
			return set;
		} catch (error) {
			console.log(`Could not set product: ${error}`);
		}
	}
	async updateProduct(id, product) {
		try {
			const res = await this.model.findOneAndUpdate({ productId: id }, product);

			return res;
		} catch (error) {
			console.log(`Could not update product: ${error}`);
		}
	}

	async deleteProduct(id) {
		try {
			const res = await this.model.findOneAndDelete({ productId: id });
			return res;
		} catch (error) {
			console.log(`Could not delete product: ${error}`);
		}
	}
}

module.exports = new ProductServiceMongo();

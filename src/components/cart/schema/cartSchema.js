const mongoose = require('mongoose');
const productSchema = require('../../products/schema/productSchema');

const cartSchema = mongoose.Schema({
	id: {
		type: Number,
		required: true,
	},
	timestamp: {
		type: Date,
		require: true,
	},
	products: {
		type: [],
	},
});

module.exports = cartSchema;

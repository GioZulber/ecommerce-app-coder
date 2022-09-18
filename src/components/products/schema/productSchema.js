const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
	{
		productId: {
			type: Number,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		code: {
			type: String,
			required: true,
		},
		thumbnail: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		stock: {
			type: Number,
			required: true,
		},
		timestamp: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = productSchema;

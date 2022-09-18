const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		userId: { type: Number, required: true },
		email: { type: String, required: true, trim: true },
		name: { type: String, required: true, trim: true },
		password: { type: String, required: true, trim: true },
		address: { type: String, required: true, trim: true },
		phone: { type: String, required: true, trim: true },
		age: { type: Number, required: true },
		avatar: { type: String, trim: true },
		role: { type: String, required: true, trim: true },
	},
	{
		timestamps: true,
	}
);

module.exports = userSchema;

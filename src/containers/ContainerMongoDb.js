const mongoose = require('mongoose');

class ContainerMongo {
	constructor(schema, collection) {
		this.schema = schema;
		this.collection = collection;
		this.model = mongoose.model(collection, schema);
	}
}

module.exports = ContainerMongo;

const { config } = require('./index');

switch (config.database) {
	case 'MONGO': {
		module.exports = require('./mongoConnection');
		break;
	}
	// case 'MYSQL': {
	// 	module.exports = require('./mysqlConnection');
	// 	break;
	// }
}

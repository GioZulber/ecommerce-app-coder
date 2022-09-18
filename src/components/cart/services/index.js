const { config } = require('../../../config/index');

switch (config.database) {
	// case 'MYSQL': {
	// 	module.exports = require('./productServiceMySql');
	// 	break;
	// }
	case 'MONGO': {
		module.exports = require('./cartServicesMongo');
		break;
	}
	case 'FS': {
		module.exports = require('./cartServicesFs');
		break;
	}
}

const { config } = require('../../../config/index');

switch (config.database) {
	case 'MONGO': {
		module.exports = require('./userServicesMongo');
		break;
	}
	case 'FS': {
		module.exports = require('./userServicesFs');
		break;
	}
}

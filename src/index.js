const express = require('express');
const cors = require('cors');

//Coneccion a la base de datos
require('./config/indexConections');
const { config } = require('./config/index');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const serverRoutes = require('./routes/index');

class Server {
	constructor() {
		this.app = express();
		this.port = config.port;
		this.settings();
		this.middlewares();
		this.routes();
	}
	settings() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.static(__dirname + '/public'));
	}
	middlewares() {
		this.app.use(cors('*'));
	}
	routes() {
		serverRoutes(this.app);
	}
	init() {
		this.app.listen(this.port, () => {
			console.log(`Server is running on port ${this.port}`);
		});
	}
}
module.exports = new Server();

require('dotenv').config();

let config = {
	port: process.env.PORT,
	database: process.env.DATABASE,
	database_url: process.env.DATABASE_URL,
	path_to_users_files: process.env.PATH_TO_USERS_FILES,
	path_to_cart_files: process.env.PATH_TO_CART_FILES,
	path_to_products_files: process.env.PATH_TO_PRODUCTS_FILES,
	secret_key: process.env.SECRET_KEY,
};

let mysqlConfig = {
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
};

let config_twilio = {
	sid: process.env.TWILIO_SID,
	token: process.env.TWILIO_TOKEN,
	wpp: process.env.TWILIO_WPP,
	wpp_admin: process.env.TWILIO_WPP_ADMIN,
};

let config_nodemailer = {
	email_from: process.env.NODEMAILER_EMAIL_FROM,
	password: process.env.NODEMAILER_PASSWORD,
	email_to: process.env.NODEMAILER_EMAIL_TO,
};

module.exports = { config, config_twilio, config_nodemailer, mysqlConfig };

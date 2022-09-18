let { createTransport } = require('nodemailer');
let { config_nodemailer } = require('../../config/index');

const email = config_nodemailer.email_from;
const password = config_nodemailer.password;

const transport = createTransport({
	service: 'gmail',
	port: 587,
	auth: {
		user: email,
		pass: password,
	},
});

const sendEmailRegister = async (user) => {
	try {
		const opts = {
			from: email,
			to: config_nodemailer.email_to,
			subject: 'New user registered',
			html: `<h1>Se registro ${user}</h1>`,
		};

		await transport.sendMail(opts);
	} catch (error) {
		console.log(error);
	}
};

const sendOrderConfirm = async (body) => {
	try {
		const opts = {
			from: email,
			to: config_nodemailer.email_to,
			subject: 'New order',
			html: body,
		};
		await transport.sendMail(opts);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	sendEmailRegister,
	sendOrderConfirm,
};

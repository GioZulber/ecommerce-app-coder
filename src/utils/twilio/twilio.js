let twilio = require('twilio');
let { config_twilio } = require('../../config/index');

let twilio_sid = config_twilio.sid;
let twilio_token = config_twilio.token;
let twilio_wpp = config_twilio.wpp;

let twilio_client = new twilio(twilio_sid, twilio_token, {
	lazyLoading: true,
});

const sendTwilioRegister = async (user) => {
	try {
		twilio_client.messages
			.create({
				from: twilio_wpp,
				to: config_twilio.wpp_admin,
				body: `Se registro ${user}`,
			})
			.then((e) => {
				console.log(e);
			});
	} catch (error) {
		console.log(error);
	}
};

const sendTwilioOrderConfirm = async (body) => {
	try {
		twilio_client.messages
			.create({
				from: twilio_wpp,
				to: config_twilio.wpp_admin,
				body: body,
			})
			.then((e) => {
				console.log(e);
			})
			.catch((e) => {
				console.log(e);
			});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	sendTwilioRegister,
	sendTwilioOrderConfirm,
};

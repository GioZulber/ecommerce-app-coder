const ContainerFiles = require('../../../containers/ContainerFiles');
const { config } = require('../../../config/index');
const { PhoneNumberContext } = require('twilio/lib/rest/lookups/v1/phoneNumber');

class UserServicesFs extends ContainerFiles {
	constructor() {
		super(config.path_to_users_files);
	}

	async findUser(email) {
		try {
			const data = await this.getData();
			if (email) {
				const user = data.find((e) => e.email === email);
				if (user) {
					const res = {
						userId: user.userId,
						username: user.username,
						email: user.email,
						thumbnail: user.thumbnail,
						address: user.address,
						phone: user.phone,
					};
					return res;
				}
			}
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	async findUserCompare(email) {
		try {
			const data = await this.getData();
			if (email) {
				return data.find((e) => e.email === email);
			}
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	async createUser(user) {
		try {
			const data = await this.getData();

			const id = data.length > 0 ? data[data.length - 1] + 1 : 1;
			let date = new Date();

			const newUser = {
				userId: id,
				timestamp: date,
				...user,
			};
			data.push(newUser);
			const res = await this.setData(data);
			return res;
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new UserServicesFs();

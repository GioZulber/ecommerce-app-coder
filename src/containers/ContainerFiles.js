const fs = require('fs');

class ContainerFiles {
	constructor(path) {
		this.path = path;
	}
	async getData() {
		try {
			if (fs.existsSync(this.path)) {
				const data = await fs.promises.readFile(this.path, 'utf8');
				return await JSON.parse(data);
			} else {
				return [];
			}
		} catch (error) {
			console.log(error);
			return [];
		}
	}
	async setData(data) {
		try {
			await fs.promises.writeFile(this.path, JSON.stringify(data, null, '\t'));
			console.log('Data saved');
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = ContainerFiles;

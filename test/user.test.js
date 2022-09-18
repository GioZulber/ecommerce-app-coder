const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;
let assert = require('assert').strict;
let axios = require('axios');

describe('Test User', () => {
	it('Login', async () => {
		let user = {
			email: 'admin@gmail.com',
			password: 'admin',
		};
		//Supertest
		// let res = await request.post('/login').send(user);

		const res = await axios.post('http://localhost:8080/login', user);
		expect(res.status).to.eql(200);
	});
	it('Register', async () => {
		let user = {
			email: 'test@gmail.com',
			name: 'test',
			password: 'test',
			address: 'testADDRESS',
			phone: 'test',
			age: 22,
			avatar: 'test',
			role: 'user',
		};
		//Supertest
		// let res = await request.post('/register').send(user);

		const res = await axios.post('http://localhost:8080/register', user);
		expect(res.status).to.eql(200);
	});
});

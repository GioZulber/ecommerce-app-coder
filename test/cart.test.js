const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;
let assert = require('assert').strict;
let axios = require('axios');

describe('Testeando el carrito', () => {
	it('Create Cart', async () => {
		// let res = await request.post("/api/carts");
		const res = await axios.post(
			'http://localhost:8080/api/carts',
			{ userId: 9 },
			{
				headers: {
					'Content-Type': 'application/json',
					authorization:
						'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYyNTk2OTYyLCJleHAiOjE2NjI2ODMzNjJ9.KScf12lB48FwG2kdUPDwowcQN1Kr9uzQn7eZQIfX9eM',
				},
			}
		);

		expect(res.status).to.equal(200);
		expect(res.data.message).to.equal('Cart agregado');
	});

	it('Create Products in cart', async () => {
		let newProduct = {
			id: 1,
			title: 'Product',
			description: 'Product Description',
			code: 'Product',
			thumbnail: 'Product thumbnail',
			price: 1233,
			quantity: 1,
		};

		const res = await axios.post('http://localhost:8080/api/carts/9/products', newProduct, {
			headers: {
				'Content-Type': 'application/json',
				authorization:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYyNTk2OTYyLCJleHAiOjE2NjI2ODMzNjJ9.KScf12lB48FwG2kdUPDwowcQN1Kr9uzQn7eZQIfX9eM',
			},
		});
		expect(res.status).to.eql(200);
		expect(res.data.message).to.eql('Producto agregado');
		expect(res.data.newProduct[0]).to.include.keys('id');
	});

	it('Get Product in cart', async () => {
		const res = await axios.get('http://localhost:8080/api/carts/9/products', {
			headers: {
				'Content-Type': 'application/json',
				authorization:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYyNTk2OTYyLCJleHAiOjE2NjI2ODMzNjJ9.KScf12lB48FwG2kdUPDwowcQN1Kr9uzQn7eZQIfX9eM',
			},
		});

		expect(res.status).to.eql(200);
		expect(res.data.message).to.eql('Productos en el carrito');
		expect(res.data.products[0]).to.include.keys('id', 'quantity');
	});

	// it('Confirm Cart order ', async () => {
	// 	const res = await axios.get('http://localhost:8080/api/carts/9/confirm');

	// 	expect(res.status).to.eql(200);
	// 	expect(res.data.message).to.eql('Pedido confirmado.');
	// });

	it('Delete Product from cart', async () => {
		let res = await axios.delete(`http://localhost:8080/api/carts/9/products/1`, {
			headers: {
				'Content-Type': 'application/json',
				authorization:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYyNTk2OTYyLCJleHAiOjE2NjI2ODMzNjJ9.KScf12lB48FwG2kdUPDwowcQN1Kr9uzQn7eZQIfX9eM',
			},
		});
		expect(res.status).to.eql(200);
		expect(res.data.message).to.eql('Producto eliminado');
	});

	it('Delete Cart', async () => {
		const res = await axios.delete(`http://localhost:8080/api/carts/9`, {
			headers: {
				'Content-Type': 'application/json',
				authorization:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYyNTk2OTYyLCJleHAiOjE2NjI2ODMzNjJ9.KScf12lB48FwG2kdUPDwowcQN1Kr9uzQn7eZQIfX9eM',
			},
		});

		expect(res.status).to.eql(200);
		expect(res.data.message).to.eql('Carrito eliminado');
	});
});

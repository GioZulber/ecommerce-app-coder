const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;
let assert = require('assert').strict;
let axios = require('axios');

describe('Testeando products', () => {
	it('Get products', async () => {
		// let res = await request.get("/api/products");
		let res = await axios.get('http://localhost:8080/api/products/', {
			headers: {
				'Content-Type': 'application/json',
				authorization:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYyNTk2OTYyLCJleHAiOjE2NjI2ODMzNjJ9.KScf12lB48FwG2kdUPDwowcQN1Kr9uzQn7eZQIfX9eM',
			},
		});

		expect(res.status).to.equal(200);
		expect(res.data.message).to.equal('Productos encontrados');
	});

	it('find One product', async () => {
		let res = await axios.get('http://localhost:8080/api/products/6', {
			headers: {
				'Content-Type': 'application/json',
				authorization:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYyNTk2OTYyLCJleHAiOjE2NjI2ODMzNjJ9.KScf12lB48FwG2kdUPDwowcQN1Kr9uzQn7eZQIfX9eM',
			},
		});

		expect(res.status).to.equal(200);
		expect(res.data.message).to.equal('Producto encontrado');
	});

	// it('Create a new product', async () => {
	// 	let newProduct = {
	// 		title: 'Product',
	// 		description: 'Product Description',
	// 		code: 'Product',
	// 		thumbnail: 'Product thumbnail',
	// 		price: 1233,
	// 		stock: 123,
	// 	};
	// 	//Supertest
	// 	// let res = await request.post('/api/products/').send(newProduct);
	// 	let res = await axios.post('http://localhost:8080/api/products/', newProduct, {
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			authorization:
	// 				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYyNTk2OTYyLCJleHAiOjE2NjI2ODMzNjJ9.KScf12lB48FwG2kdUPDwowcQN1Kr9uzQn7eZQIfX9eM',
	// 		},
	// 	});
	// 	expect(res.status).to.eql(200);
	// 	expect(res.data.message).to.eql('Producto agregado');
	// });

	// it('Update product', async () => {
	// 	let updateProduct = {
	// 		id: 9,
	// 		title: 'Product Update',
	// 		description: 'Product Description Update',
	// 		code: 'Product Update',
	// 		thumbnail: 'Product thumbnail update',
	// 		price: 1233,
	// 		stock: 123,
	// 	};
	// 	let res = await axios.put(
	// 		`http://localhost:8080/api/products/${updateProduct.id}`,
	// 		updateProduct,
	// 		{
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				authorization:
	// 					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYyNTk2OTYyLCJleHAiOjE2NjI2ODMzNjJ9.KScf12lB48FwG2kdUPDwowcQN1Kr9uzQn7eZQIfX9eM',
	// 			},
	// 		}
	// 	);
	// 	// console.log(res);
	// 	expect(res.status).to.eql(200);
	// 	expect(res.data.message).to.eql('Producto actualizado');
	// });

	it('Delete Product', async () => {
		const res = await axios.delete(`http://localhost:8080/api/products/9`, {
			headers: {
				'Content-Type': 'application/json',
				authorization:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYyNTk2OTYyLCJleHAiOjE2NjI2ODMzNjJ9.KScf12lB48FwG2kdUPDwowcQN1Kr9uzQn7eZQIfX9eM',
			},
		});

		expect(res.status).to.eql(200);
		expect(res.data.message).to.eql('Producto eliminado');
	});
});

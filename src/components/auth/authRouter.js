const { Router } = require('express');
const AuthController = require('./controller/AuthContoller');
const { verifyToken } = require('../../middlewares/authJwt');
const { upload } = require('../../utils/multer/multer');

module.exports = (app) => {
	let router = new Router();
	app.use('/', router);
	router.post('/register', upload.single('avatar'), AuthController.register);
	router.post('/login', AuthController.login);
	router.get('/user', verifyToken, AuthController.getUser);
};

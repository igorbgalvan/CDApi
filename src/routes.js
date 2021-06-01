const express = require('express');
const AuthController = require('./controllers/AuthController');

const UsersController = require('./controllers/UsersController');
const token = require('./middlewares/AuthMiddleware');

const routes = express.Router();


// Users routes
routes.get('/users', token, UsersController.index);
routes.post('/users', UsersController.store);
routes.delete('/user/:id', token, UsersController.delete);
routes.put('/user/:id', token, UsersController.update)

//Auth routes
routes.post('/auth', AuthController.auth);

module.exports = routes;


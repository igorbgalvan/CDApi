const express = require('express');
const AddressesController = require('./controllers/AddressesController');
const AuthController = require('./controllers/AuthController');
const PaymentsController = require('./controllers/PaymentsController');
const UsersController = require('./controllers/UsersController');
const token = require('./middlewares/AuthMiddleware');

const routes = express.Router();

//Address routes
routes.get('/:user_id/address', token, AddressesController.get);
routes.get('/addresses', token, AddressesController.index);
routes.post('/:user_id/address', token, AddressesController.store);
routes.put('/address/:id', token, AddressesController.update);
routes.delete('/address/:id', token, AddressesController.delete);

//Payment routes
routes.get('/:user_id/payment', token, PaymentsController.get);
routes.get('/payments', token, PaymentsController.index);
routes.post('/:user_id/payment', token, PaymentsController.store);
routes.delete('/payment/:id', token, PaymentsController.delete);

// Users routes
routes.get('/users', token, UsersController.index);
routes.post('/users', UsersController.store);
routes.delete('/user/:id', token, UsersController.delete);
routes.put('/user/:id', token, UsersController.update)

//Auth routes
routes.post('/auth', AuthController.auth);

module.exports = routes;


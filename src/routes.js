const express = require('express');
const AddressesController = require('./controllers/AddressesController');
const AuthController = require('./controllers/AuthController');
const CategoriesController = require('./controllers/CategoriesController');
const OrdersController = require('./controllers/OrdersController');
const PaymentsController = require('./controllers/PaymentsController');
const ProductsController = require('./controllers/ProductsController');
const UsersController = require('./controllers/UsersController');
const token = require('./middlewares/AuthMiddleware');

const routes = express.Router();


//Orders routes

routes.get('/orders', token, OrdersController.index);
routes.get('/order/:id', token, OrdersController.get);
routes.post('/:product_id/orders', token, OrdersController.store);
routes.delete('/order/:id', token, OrdersController.delete);
routes.put('/order/:id', token, OrdersController.update);

//Cateogories routes
routes.post('/:product_id/categories', token, CategoriesController.storeWithProduct);
routes.get('/categories', token, CategoriesController.index);
routes.get('/category/:id', token, CategoriesController.get);
routes.post('/categories', token, CategoriesController.store);
routes.put('/category/:id', token, CategoriesController.update);
routes.delete('/category/:id', token, CategoriesController.delete);

//Products routes
routes.get('/products', token, ProductsController.index);
routes.get('/product/:id', token, ProductsController.get);
routes.post('/products', token, ProductsController.store);
routes.post('/:category_id/products', token, ProductsController.storeWithCategory);
routes.put('/product/:id', token, ProductsController.update);
routes.delete('/product/:id', token, ProductsController.delete);

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


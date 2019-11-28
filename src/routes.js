const express = require('express');

const UserController = require('./controllers/UserController');
const LinksController = require('./controllers/LinksController');

const FollowersController = require('./controllers/FollowersController');
const FollowingController = require('./controllers/FollowingController');

const User = require('./models/User');

const routes = express.Router();

routes.get('/', (req, res) => {
	return res.json({"server_status": "running"});
});

routes.get('/favicon.ico', (req, res) => {
    res.status(204);
});

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.post('/users/:userId/links', LinksController.store);

routes.post('/users/:userId/flowers', FollowersController.store);
routes.post('/users/:userId/wings', FollowingController.store);

module.exports = routes;

const express = require('express');
const bcrypt = require('bcryptjs');
//https://www.youtube.com/watch?v=eFOUJvYEF2E kamaitachi - ragnarok
const UserController = require('./controls/UserController');
const PostsController = require('./controls/LinkController');


const User = require('./models/User');

const { genToken, authTest } = require('./middle/auth.js');

const routes = express.Router();


routes.post('/auth', async (req, res) => { //login
	const { login, password } = req.body;
	const user = await User.findOne({ "login": login })
	 .select("+password");
	if(!user){
		return res.status(404).send("user not found");
	}if(!await bcrypt.compare(password, user.password)){
		return res.status(400).json("invalid password")
	}
	user.password = undefined;
        return res.send({
            "user": user,
            "token": genToken({ id: user.id })
        });
});

routes.get('/', authTest, UserController.index); //index
routes.post('/', UserController.store); //register
routes.delete('/', authTest, UserController.delete); //delete

routes.get('/posts', authTest, PostsController.index); //get
routes.post('/posts', authTest, PostsController.store); //create
routes.delete('/posts', authTest, PostsController.delete); //delete

module.exports = routes;

const express = require('express');
const bcrypt = require('bcryptjs');
//https://www.youtube.com/watch?v=eFOUJvYEF2E kamaitachi - ragnarok
const UserController = require('./controls/UserController');
const PostsController = require('./controls/PostsController');

const FollowingController = require('./controls/FollowingController');

const User = require('./models/User');

const { genToken, authTest } = require('./middle/auth.js');

const routes = express.Router();

routes.get('/authTest', authTest, (req, res) => (
    res.send({ok: true, userId: req.userId})
));

routes.post('/auth', async (req, res) => {
	const { login, password } = req.body;
	const user = await User.findOne({ "login": login })
	 .select("+password");
	if(!user){
		return res.status(404).send("404");
	}if(!await bcrypt.compare(password, user.password)){
		return res.status(400).send("invalid password")
	}
	user.password = undefined;
        return res.send({
            "user": user,
            "token": genToken({ id: user.id })
        });
});

routes.get('/', authTest, UserController.index);
routes.post('/', UserController.store);

routes.get('/posts', authTest, PostsController.index);
routes.post('/posts', authTest, PostsController.store);
routes.delete('/posts', authTest, PostsController.delete);

routes.get('/following', authTest, FollowingController.index);
routes.post('/following', authTest, FollowingController.store);
routes.delete('/following', authTest, FollowingController.delete);

module.exports = routes;

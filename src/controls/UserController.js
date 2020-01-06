const User = require('../models/User');
const bcrypt = require('bcryptjs');

const {genToken} = require('../middle/auth.js');

module.exports = {
    async indexOwn(req, res) {
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(404).send("user not found");
        }
        return res.json({
            user
        });
    },
    
    async indexRandom(req, res) {
        return res.json({
            error: "invalid route"
        });
    },
    
    async index(req, res) {
        const { loginUser } = req.params; 
        const user = await User.findOne({ login: loginUser });
        if(!user){
            return res.status(404).send("user not found");
        }
        return res.json({
            user
        });
    },
    
    async store(req, res) {
        const { login, password } = req.body;

        const userExists = await User.findOne({ login });

        if(userExists){
            return res.send({ error: "user exists" });
        }

        const user = await User.create({
            "login": login,
            "password": password
        });
        return res.send({
            "user": user,
            "token": genToken({ id: user.id })
        });
    },
    
    async delete(req, res) {
        const { login } = req.headers;

        const userDeleted = await User.findOneAndDelete({ login: login });

        if(userDeleted){
            return res.json(userDeleted);
        }

	console.log("\n");
        console.log(userDeleted);
        return res.json(userDeleted);

    },
    
    async update(req, res) {
        const { login } = req.headers;
        
        console.log(login);


        const userReplaced = await User.findOneAndReplace({ 'login': login }, req.body);

        if(userReplaced){
            return res.json(userReplaced);
        }

	console.log("\n");
        console.log(userReplaced);
        return res.json(userReplaced);

    }
};

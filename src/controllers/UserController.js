const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const { login } = req.headers;
        
        const userExists = await User.findOne({ "login": login });
        
	console.log("\n");
        console.log(userExists);
        
        return res.json(userExists);
    },
    
    async store(req, res) {
        const { login } = req.headers;

        const userExists = await User.findOne({ login: login });

        if(userExists){
            return res.json(userExists);
        }

        const { name, bio, avatar_url, password } = req.body;

	console.log("\n");
        console.log({login, name, avatar_url, password});
            return res.json( await User.create({
                "login": login,
                "name": name,
                "bio": bio,
                "avatar_url": avatar_url,
                "password": password
            }) );
    }
};

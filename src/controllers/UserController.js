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

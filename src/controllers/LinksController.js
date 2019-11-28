const Dev = require('../models/User');

module.exports = {
    async store(req, res) {

        const { userId } = req.params;
        const { name, url } = req.body;

        const loggedDev = await Dev.findById(userId);

        loggedDev.links.push({'name': name, 'url': url});

        await loggedDev.save();

        return res.json(loggedDev);
    }
};

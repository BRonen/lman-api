const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const loggedUser = await User.findById(req.userId);

        if(!loggedUser){
            return res.status(404).send('user not found');
        }

        return res.json( loggedUser.links );
    },
    async store(req, res) {
        const loggedUser = await User.findByIdAndUpdate(req.userId,
        {$push: { links: req.body }},
        {safe: true, upsert: true, new: true, useFindAndModify: false});
        
        if(!loggedUser){
            return res.status(404).send('user not found');
        }

        return res.json(loggedUser.links);
    },
    async delete(req, res) {

        const linkId = mongoose.Types.ObjectId(req.body.linkId);

        const loggedUser = await User.findByIdAndUpdate(req.userId,
            {$pull: { links: { _id: linkId } }},
            {safe: true, upsert: true, new: true, useFindAndModify: false}
        );
        
        if(loggedUser){
            return res.json(loggedUser.links);
        }else{
            return res.status(404).send('you aren\'t the owner');
        }
    }
};

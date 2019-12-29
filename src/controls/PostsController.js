const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const loggedUser = await User.findById(req.userId);

        if(!loggedUser){
            return res.status(404).send('user not found');
        }

        return res.json({posts: loggedUser.posts});
    },
    async store(req, res) {
        const loggedUser = await User.findByIdAndUpdate(req.userId,
        {$push: { posts: { owner: req.userId, content: req.body.content } }},
        {safe: true, upsert: true, new: true, useFindAndModify: false});
        
        if(!loggedUser){
            return res.status(404).send('user not found');
        }
        
        console.log(loggedUser);
        return res.json(loggedUser.posts);
    },
    async delete(req, res) {

        const postId = mongoose.Types.ObjectId(req.body.postId);

        const loggedUser = await User.findByIdAndUpdate(req.userId,
            {$pull: { posts: { _id: postId } }},
            {safe: true, upsert: true, new: true, useFindAndModify: false}
        );
        
        if(loggedUser){
            return res.json(loggedUser.posts);
        }else{
            return res.status(404).send('you aren\'t the owner');
        }
    }
};

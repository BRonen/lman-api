const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = {
    async index(req, res) { //index followers & following of logged user
        const loggedUser = await User.findById(req.userId);

        if(!loggedUser){
            return res.status(404).send('user not found');
        }

        return res.json({
            'following': loggedUser.following,
            'followers': loggedUser.followers
        });
    },
    async store(req, res) { //add following to logged user &
                            //add follower to target user
        const targetId = mongoose.Types.ObjectId(req.body.targetId);
        
        if(!await User.findById(targetId)){
            return res.status(404).send('wrong target id');
        }
        
        const loggedUser = await User.findByIdAndUpdate(req.userId,
        {$push: { following: targetId }}, {
            safe: true,
            upsert: true,
            new: true,
            useFindAndModify: false
        });
        
        if(!loggedUser){
            return res.status(404).send('wrong user id');
        }
        
        const targetUser = await User.findByIdAndUpdate(targetId,
        {$push: { followers: req.userId }}, {
            safe: true,
            upsert: true,
            new: true,
            useFindAndModify: false
        });
        
        console.log(loggedUser);
        return res.json(loggedUser.followers);
    },
    async delete(req, res){ //remove following to logged user &
                            //remove follower to target user
        const targetId = mongoose.Types.ObjectId(req.body.targetId);

        if(!await User.findById(targetId)){
            return res.status(404).send('wrong target id');
        }

        const loggedUser = await User.findByIdAndUpdate(req.userId,
            {$pull: { following: targetId }}, {
                safe: true,
                upsert: true,
                new: true,
                useFindAndModify: false
            }
        );

        if(!loggedUser){
            return res.status(404).send('wrong user id');
        }

        const targetUser = await User.findByIdAndUpdate(targetId,
            {$pull: { followers: req.userId }}, {
                safe: true,
                upsert: true,
                new: true,
                useFindAndModify: false
            }
        );

        return res.json(loggedUser.followers);

    }
};

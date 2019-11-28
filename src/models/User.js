const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  
  name: String,
  avatar_url: String,
  bio: String,
  
  links:[{
        name: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
  }],

  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  
}, {
  timestamps: true,
});

module.exports = model('User', UserSchema);

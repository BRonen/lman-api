const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  login: {
    type: String,
    required: true,
  },
  
  password: {
    type: String,
    required: true,
    select: false,
  },
  
  links: [{
    title: {
      type: String,
      ref: 'User',
      required: true,
    },
    content: [{
      type: String,
      required: true,
    }],
  }],
}, {
  timestamps: true,
});

UserSchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  
  next();
});

module.exports = model('User', UserSchema);

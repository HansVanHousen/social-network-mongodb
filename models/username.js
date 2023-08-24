const { Schema, model, Types } = require('mongoose');
const thoughtsSchema = require('./Thoughts')
// Schema to create a course model
const usernameSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'thoughts',
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Username',
          // username?
        },
      ],
  },
  {
    toJSON: {
      virtualss: true,
    },
    id: false,
  }
);

// Virtual to get the friendCount (length of the friends array)
usernameSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });
  
const Username = model('Username', usernameSchema);

module.exports = Username;
const { Schema, model } = require('mongoose');

// Schema to create a course model
const usernameSchema = new Schema(
  {
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      thougts: [thoughtsSchema],
      friends: [usernameSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual to get the friendCount (length of the friends array)
usernameSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });
  
// Loop through the friends array and access the _id property for each friend
user.friends.forEach((friend) => {
    console.log(friend._id); // Access the _id property of each friend object
  });
const username = model('username', usernameSchema);

module.exports = username;



// User:

// username

// String
// Unique
// Required
// Trimmed
// email

// String
// Required
// Unique
// Must match a valid email address (look into Mongoose's matching validation)
// thoughts

// Array of _id values referencing the Thought model
// friends

// Array of _id values referencing the User model (self-reference)
const { Schema, model } = require('mongoose');

// Schema to create a course model
const thoughtsSchema = new Schema(
  {
    thoughtsText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
      default: 'Unnamed thought',
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
        type: String,
        required: true,
      },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }git 
);

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;

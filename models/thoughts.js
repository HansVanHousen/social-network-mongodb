const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

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
      get: timestamp => new Date(timestamp).toLocaleString(),
    },
    username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
)
// Virtual to get the reactionCount (length of the thoughts array)
thoughtsSchema.virtual('reactionCount').get(function () {
  return this.thoughts.length;
});
const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;
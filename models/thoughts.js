const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const formattedDate = require('../utils/date.js');
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
      get: (date) => formattedDate(date)
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
  return this.reactions.length;
});
const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;
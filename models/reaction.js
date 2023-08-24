const { Schema, Types } = require('mongoose');
const formattedDate = require('../utils/date.js');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
          get: (date) => formattedDate(date)
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
// Getter method to format the createdAt timestamp
reactionSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt.toLocaleString(); //date formatting logic
});

module.exports = reactionSchema;

const { Username, Thoughts } = require("../models");
const { create } = require("../models/Thoughts");

// const { ObjectiD } = require('mongoose').Types

// create
// .create

// Read
// .find
// .findOne

// update
// .findOneAndUpdate

// delete
// .findOneAndRemove
// .findOneAndDelete?

//tools
// $set
// $addtoset
// $pull

// FRIENDS!
module.exports = {
  // Get all usernames .populate("thoughts").populate("friends")
  getUsername(req, res) {
    Username.find().select().populate("friends").populate("thoughts")
      .then((username) => res.json(username))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  getSingleUsername(req, res) {
    console.log(req.params);
    Username.findOne({ _id: req.params.userId })
      .select("-__v").populate("friends").populate("thoughts")
      .then(async (username) =>
        !username
          ? res.status(404).json({ message: req.params.userId })
          : res.json({ username: req.params.userId })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new username
  createUsername(req, res) {
    Username.create(req.body)
      .then((username) => res.json(username))
      .catch((err) => res.status(500).json(err));
  },

  updateUserById(req, res) {
    Username.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a Username
  deleteUsername(req, res) {
    console.log("randy")
    Username.findOneAndDelete({_id: req.params.userId})
      .then((username) => res.json(username))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
   // Add friend to user's friend list
   addFriend(req, res) {
    Username.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.friendId || req.params.friendId } },
      { runValidators: true, new: true }
    )
    .then((username) => res.json(username))
    .catch((err) => res.status(500).json(err));
},
  
  // remove friend
  removeFriend({ params }, res) {  
    Username.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
    .then((username) => res.json(username))
    .catch((err) => res.status(500).json(err));
    },
  
}
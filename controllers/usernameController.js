const { Username, Thoughts } = require("../models");

// FRIENDS!
(module.exports = {
  // Get all username
  getUsername(req, res) {
    Username.find()
      .then((username) => res.json(username))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  getSingleUsername(req, res) {
    console.log(req.params);
    Username.findOne({ _id: req.params.userId })
      .select("-__v")
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
  // update a user by id
  updateUserById(req, res) {
    User.findOneAndUpdate(req.params.id, req.body, { new: true })
      .then((username) => {
        if (!username) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },
  // Delete a Username
  deleteUsername(req, res) {
    Username.findOneAndRemove({ _id: req.params.userId })
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
      { new: true }
    )
      .then((username) => {
        if (!username) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(userData);
      })
      .catch((err) => {res.status(500).json(err)});
  },
  
  // remove friend
  removeFriend({ params }, res) {  
    Username.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbusername) => {
        if (!dbusername) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        const removed = !dbusername.friends.includes(params.friendId);
   
        if (removed) {
          res.json({ message: "Friend removed successfully!", dbusername });
        } else {
          res.json(dbusername);
        }
      })
      .catch((err) => res.status(400).json(err));
    },
  
})
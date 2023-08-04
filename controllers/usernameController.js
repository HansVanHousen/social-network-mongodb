const { ObjectId } = require('mongoose').Types;
const { Username, Course } = require('../models');

// FRIENDS!
module.exports = {
  // Get all username
  getUsername(req, res) {
    Username.find()
      .then(async (username) => {
        const usernameObj = {
            username,
          headCount: await headCount(),
        };
        return res.json(usernameObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single Username
  getSingleUsername(req, res) {
    Username.findOne({ _id: req.params.usernameId })
      .select('-__v')
      .then(async (username) =>
        !username
          ? res.status(404).json({ message: 'No username with that ID' })
          : res.json({
            username,
              grade: await grade(req.params.usernameId),
            })
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
  // Delete a Username and remove them from the course
  deleteUsername(req, res) {
    Username.findOneAndRemove({ _id: req.params.usernameId })
      .then((username) =>
        !username
          ? res.status(404).json({ message: 'No such username exists' })
          : Course.findOneAndUpdate(
              { username: req.params.usernameId },
              { $pull: { username: req.params.usernameId } },
              { new: true }
            )
      )
      .then((course) =>
        !course
          ? res.status(404).json({
              message: 'username deleted, but no courses found',
            })
          : res.json({ message: 'username successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an assignment to a Username
  addAssignment(req, res) {
    console.log('You are adding an assignment');
    console.log(req.body);
    Username.findOneAndUpdate(
      { _id: req.params.usernameId },
      { $addToSet: { assignments: req.body } },
      { runValidators: true, new: true }
    )
      .then((username) =>
        !username
          ? res
              .status(404)
              .json({ message: 'No username found with that ID :(' })
          : res.json(username)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a Username
  removeAssignment(req, res) {
    Username.findOneAndUpdate(
      { _id: req.params.usernameId },
      { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
      { runValidators: true, new: true }
    )
      .then((username) =>
        !username
          ? res
              .status(404)
              .json({ message: 'No username found with that ID :(' })
          : res.json(username)
      )
      .catch((err) => res.status(500).json(err));
  },
};

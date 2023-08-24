const { Thoughts, Username } = require("../models");
// need reactions/\?
module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThoughts(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtid })
      .select("-__v")
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  async createThoughts(req, res) {
    try {
      const newThought = await Thoughts.create(req.body);
      if (newThought) {
        await Username.findByIdAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: newThought._Id } },
          { new: true }
        );
      }
      res.json("thought created")
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a thoughts
  deleteThoughts(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtsId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thought with that ID" })
          : Username.deleteMany({ _id: { $in: thoughts.username } })
      )
      .then(() => res.json({ message: "thoughts and username deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thoughts
  updateThoughts(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thoughts with this id!" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },

  createReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thoughts with this id!" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Handler for the "delete reaction" API endpoint
  deleteReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thoughts with this id!" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
};

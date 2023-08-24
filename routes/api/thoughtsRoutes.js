const router = require('express').Router();
const {
  getThoughts,
  getSingleThoughts,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtsController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThoughts);

router.route('/:thoughtsId/reactions').put(createReaction);
router.route('/:thoughtsId/reactions/:reactionId').delete(deleteReaction);

// /api/thoughts/:thoughtsId
router
  .route('/:thoughtsId')
  .get(getSingleThoughts)
  .put(updateThoughts)
  .delete(deleteThoughts);

module.exports = router;

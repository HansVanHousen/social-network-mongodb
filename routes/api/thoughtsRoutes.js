const router = require('express').Router();
const {
  getThoughts,
  getSingleThoughts,
  createThoughts,
  updateThoughts,
  deleteThoughts,
} = require('../../controllers/thoughtsController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThoughts);

// /api/thoughts/:thoughtsId
router
  .route('/:thoughtsId')
  .get(getSingleThoughts)
  .put(updateThoughts)
  .delete(deleteThoughts);

module.exports = router;

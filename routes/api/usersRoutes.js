const router = require('express').Router();
const {
  getUsername,
  getSingleUsername,
  createUsername,
  deleteUsername,
  addFriend,
  removeFriend,
} = require('../../controllers/usernameController');

// /api/username
router.route('/').get(getUsername).post(createUsername);
// /api/username
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);
// /api/user/:userId
router.route('/:userId').get(getSingleUsername).delete(deleteUsername);
module.exports = router;

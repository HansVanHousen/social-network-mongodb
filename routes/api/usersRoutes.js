const router = require('express').Router();
const {
  getUsername,
  getSingleUsername,
  createUsername,
  updateUserById,
  deleteUsername,
  addFriend,
  removeFriend,
} = require('../../controllers/usernameController');

// /api/username
router.route('/').get(getUsername).post(createUsername);
// /api/username
router.route('/:userId/friends/:friendId').put(addFriend).put(removeFriend);
// /api/user/:userId
router.route('/:userId').get(getSingleUsername).delete(deleteUsername).put(updateUserById);
module.exports = router;

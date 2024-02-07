const express = require('express');

const { autheticate } = require('../middleware/ProtectedRoute');
const { getuserbyid, getalluser, updateuserbyid, followuser, unfollowuser, getusertweets,getuserretweets, uploadprofilepic } = require('../controllers/user_controoller');

const router = express.Router();

// get user by id
router.get('/:id', getuserbyid);
// get all users 
router.get("/", getalluser);
// update user by id
router.put("/:id",autheticate, updateuserbyid);
// follow user 
router.put("/:id/follow",autheticate, followuser);
// unfollow user
router.put("/:id/unfollow",autheticate, unfollowuser);
// get user tweets
router.get("/:id/tweets", getusertweets);
// get all user tweet
router.get("/:id/retweets", getuserretweets);
// uploade profile pic
router.post("/:id/uploadprofilepic",autheticate, uploadprofilepic);


module.exports = router;

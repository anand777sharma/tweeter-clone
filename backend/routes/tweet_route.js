const express= require('express');
const { autheticate } = require('../middleware/ProtectedRoute');
const { createtweet,liketweet,disliketweet,replytweet,gettweetbyid,getalltweet,deletetweet,retweet } = require('../controllers/tweet_controller');

const router= express.Router();
// create tweet
router.post('/',autheticate,createtweet);
// like tweet
router.put('/:id/like',autheticate,liketweet);
// dislike tweet
router.put('/:id/dislike',autheticate,disliketweet);
// reply on  tweet
router.post('/:id/reply',autheticate,replytweet);
// get single tweet detail
router.get('/:id',gettweetbyid);
// get all tweet detail
router.get('/',getalltweet);
// delete tweet 
router.delete('/:id',autheticate,deletetweet);
// get all tweet detail
router.put('/:id/retweet',autheticate,retweet);


module.exports=router;
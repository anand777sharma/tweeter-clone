const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const TweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
   
    tweetedby: {
        type: ObjectId,
        ref: "User"
    },
    replyingto: {
        type: ObjectId,
        ref: "User",
    },
    likes: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],

    retweetedby: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],
    picture: {
        type: String,
        default: null
    },
    replies: [
        {
            type: ObjectId,
            ref: 'Tweet',
        }
    ],
},
    { timestamps: true }
);

module.exports = mongoose.model("Tweet", TweetSchema);
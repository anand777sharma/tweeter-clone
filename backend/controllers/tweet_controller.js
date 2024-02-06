const Tweet = require("../models/Tweet");
// create tweet controller
const createtweet = async (req, res) => {
    try {
        // destructuring data
        const { content, picture } = req.body;
        if (!content) {
            return res.status(400).json({
                message: "please write something!!"
            })
        }

        const newTweet = new Tweet({ content: content, picture: picture, tweetedby: req.user });
        await newTweet.save();

        res.status(201).json({ message: "Tweet Added" })
    } catch (error) {
        console.log(error);
    }
}
// like controller
const liketweet = async (req, res) => {
    try {  // destructuring data
        const { id } = req.params;
        const tweetfound = await Tweet.findById(id)


        if (!tweetfound) {
            return res.status(400).send({
                message: `tweet not found`
            });
        }

        //checking if the tweet is already liked or not
        const liked = await Tweet.findOne({ _id: id, likes: req.user._id });
        if (!liked) {

            await Tweet.findByIdAndUpdate(req.params.id, {
                $push: { likes: req.user._id }
            }, {
                new: true // returns updated record
            })

            res.status(200).send({
                message: `like done`
            })
        }

    } catch (error) {
        console.log(error);
    }

}
// dislike controller
const disliketweet = async (req, res) => {
    try {  // destructuring data
        const { id } = req.params;

        const tweetfound = await Tweet.findById(id)
        console.log(tweetfound)

        if (!tweetfound) {
            return res.status(400).send({
                message: `tweet not found`
            });
        }

        //checking if the tweet is already liked or not
        if (!tweetfound.likes.some(i => i === req.user._id)) {

            await Tweet.findByIdAndUpdate(req.params.id, {
                $pull: { likes: req.user._id }
            }, {
                new: true
            })

            res.status(200).send({
                message: `unlike done`
            })
        }

    } catch (error) {
        console.log(error);
    }

}
// reply controller
const replytweet = async (req, res) => {
    try {  // destructuring data
        const { content, picture } = req.body;
        // const picture = req.file.path;
        if (!content) {
            return res.status(400).json({
                message: "please write something!!"
            })
        }

        const newTweet = new Tweet({
            content: content, picture: picture, tweetedby: req.user,
            //  replyingto: req.params.id
        });
        await newTweet.save();

        await Tweet.findByIdAndUpdate(req.params.id, {
            $push: { replies: newTweet._id }
        }, {
            new: true // returns updated record
        })

        res.status(201).json({ message: "reply Added" })
    } catch (error) {
        console.log(error);
    }
}
// detail of particular tweet using id
const gettweetbyid = async (req, res) => {
    // destructuring data
    const { id } = req.params;
    try {
        const tweet = await Tweet.findById(id).populate("tweetedby").populate("replies").sort({ createdAt: -1 }).populate({
            path: 'replies',
            populate: { path: 'tweetedby' }
        });
        if (!tweet) {
            return res.status(404).send({ message: "tweet not found" });
        }
        res.status(200).send(tweet);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Error Occurred" });
    }
};
// delete tweet uning id
const deletetweet = async (req, res) => {
    // destructuring data
    const { id } = req.params;
    const tweetfound = await Tweet.findById(id)
        .populate("tweetedby")

    if (!tweetfound) {
        return res.status(400).send({
            message: `tweet not found`
        });
    }

    //checking if the tweet author is same as loggedin user only then allow deletion
    if (tweetfound.tweetedby._id.toString() === req.user._id.toString()) {

        await Tweet.deleteOne({ _id: tweetfound._id })
        res.json({ message: "tweet removed" });

    }
    else {
        res.json({ message: "not your tweet how dare you to think even about deleting this" });
    }
}
// retweet controller
const retweet = async (req, res) => {
    // destructuring data
    const { id } = req.params;
    try {
        const tweeted = await Tweet.findOne({ _id: id, retweetedby: req.user._id });
        // console.log(tweeted);
        if (!tweeted) {

            await Tweet.findByIdAndUpdate(id, {
                $push: { retweetedby: req.user._id }
            }, {
                new: true // returns updated record
            })

            res.status(200).send({
                message: `retweet done`
            })
        }
        else {
            return res.status(400).send({
                message: `tweet not found`
            });
        }



    } catch (error) {
        console.log(error);
    }
}
// thiss will give all the tweets for the tweetlist page
const getalltweet = async (req, res) => {
    try {
        const data = await Tweet.find().sort({ createdAt: -1 }).populate("tweetedby").populate("replyingto");
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Error Occured" })
    }
}


module.exports = { createtweet, liketweet, disliketweet, replytweet, gettweetbyid, getalltweet, deletetweet, retweet }
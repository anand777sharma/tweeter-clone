const User = require('../models/User');
const Tweet = require('../models/Tweet');

const getuserbyid = async (req, res) => {
    // getting id from params
    const { id } = req.params;
    try {
        // get user using id and sending response without password
        const user = await User.findById(id, '-password').populate("followers").populate("following");
        if (!user) {
            return res.status(404).send({ message: "user not found" });
        }
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Error Occurred" });
    }
};

const getalluser = async (req, res) => {
    try {
        // Get all users from the database, excluding the password field
        const users = await User.find({}, '-password');

        if (!users || users.length === 0) {
            return res.status(404).send({ message: "No Users Found" });
        }

        res.status(200).send({ message: "Users Found", users });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error Occurred", error });
    }
};

const updateuserbyid = async (req, res) => {
    const { id } = req.params;
    try {
        const { name, location, dateofbirth } = req.body;
        // Find user by id
        const user = await User.findById(id);

        // Update user information with the provided data
        const updateduser = await User.findByIdAndUpdate(
            id,
            {
                name: name || user.name,
                location: location || user.location,
                dateofbirth: dateofbirth || user.dateofbirth,
            },
            { new: true }
        );
        res.status(200).send({
            message: "Profile updated successfully", updateduser
        });
    } catch (error) {
        console.log(error);
    }
};

const followuser = async (req, res) => {
    try {
        // Add the user id to the followers array of the user being followed
        await User.findByIdAndUpdate(req.params.id, {
            $push: { followers: req.user._id }
        }, {
            new: true // returns updated record
        });

        // Add the followed user's id to the following array of the current user
        const updateduser = await User.findByIdAndUpdate(req.user._id, {
            $push: { following: req.params.id }
        }, {
            new: true // returns updated record
        });
        res.status(200).send({
            message: `Follow done`, updateduser
        });
    } catch (error) {
        console.log(error);
    }
};

const unfollowuser = async (req, res) => {
    try {
        // Remove the user id from the followers array of the user being unfollowed
        await User.findByIdAndUpdate(req.params.id, {
            $pull: { followers: req.user._id }
        }, {
            new: true // returns updated record
        });

        // Remove the unfollowed user's id from the following array of the current user
        const updateduser = await User.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.params.id }
        }, {
            new: true // returns updated record
        });
        res.status(200).send({
            message: "Unfollow done", updateduser
        });
    } catch (error) {
        console.log(error);
    }
};

const getusertweets = async (req, res) => {
    try {
        // Get tweets by user id, sorted by creation date
        const { id } = req.params;
        const tweets = await Tweet.find({ tweetedby: id }).sort({ createdAt: -1 }).populate("tweetedby");
        res.status(200).send(tweets);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Error Occurred" });
    }
};

const getuserretweets = async (req, res) => {
    try {
        // Get retweets by user id, sorted by creation date
        const { id } = req.params;
        const retweets = await Tweet.find({ retweetedby: id }).sort({ createdAt: -1 });
        res.status(200).send(retweets);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Error Occurred" });
    }
};

const uploadprofilepic = async (req, res) => {
    const { id } = req.params;
    try {
        const { profileImg } = req.body;
        // Find user by id
        const user = await User.findById(id);
        
        // Update user's profile picture
        const updateduser = await User.findByIdAndUpdate(
            id,
            {
                profileImg: profileImg || user.profileImg,
            },
            { new: true }
        );
        res.status(200).send({
            message: "Profile picture updated successfully", updateduser
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getuserbyid, getalluser, updateuserbyid, followuser, unfollowuser, getusertweets, getuserretweets, uploadprofilepic }
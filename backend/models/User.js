const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        default: "https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg"
    },
    location: {
        type: String,
        default:null

    },
    dateofbirth: {
        type: Date,
        default:null
    },
    followers: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],
}, 
{ timestamps: true }
);

module.exports =mongoose.model("User", userSchema);
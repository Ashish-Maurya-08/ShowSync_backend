const mongoose = require('mongoose')
const Schema =mongoose.Schema;

const friendSchema = new Schema({
    userId: String,
    friends: {
        friendId: String,
        friendsDate: Date
    }
})

module.exports=mongoose.model("friendsList",friendSchema);
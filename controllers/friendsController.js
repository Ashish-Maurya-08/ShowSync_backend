const FriendList = require('../models/friends')

exports.addFriend = async (req, res) => {
    const friend = new FriendList({
        userId: req.body.userId,
        friends: {
            friendId: req.body.friendId,
            friendsDate: Date.now()
        }
    })
    try {
        const newFriend = await friend.save()
        res.status(201).json(newFriend)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.removeFriend = async (req, res) => {
    const friend = req.body.friendId
    const userId = req.body.userId
    try {
        const removedFriend = await FriendList.findOneAndDelete({ userId: userId, friends: { friendId: friend } })
        res.status(201).json(removedFriend)
    }
    catch{
        res.status(400).json({ message: err.message }) 
    }
}

exports.getFriends = async (req, res) => {
    const userId = req.body.userId
    try {
        const friends = await FriendList.findOne({ userId: userId })
        res.status(201).json(friends)
    }
    catch{
        res.status(400).json({ message: err.message }) 
    }
    
}
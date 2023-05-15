const FriendList = require('../models/friends')

exports.addFriend = async (req, res) => {
    const friendExists = await FriendList.findOne({ userId: req.body.userId })
    if (friendExists) {
        const friend = req.body.friendId
        const date = Date.now()
        try {
            friendExists.friends.push({ friendId: friend, friendsDate: date })
            const updatedFriend = await friendExists.save()
            res.status(201).json(updatedFriend)
        } catch (err) {
            res.status(400).json({ message: err.message })
        } 
    }
    else {
        const friend = req.body.friendId
        const date = Date.now()
        const friendList = new FriendList({
            userId: req.body.userId,
            friends: [{ friendId: friend, friendsDate: date }]
        })
        try {
            const newFriend = await friendList.save()
            res.status(201).json(newFriend)
        } catch (err) {
            res.status(400).json({ message: err.message })
        } 
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
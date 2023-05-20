const myList = require('../models/myLists');

exports.addToList = async (req, res) => {
    const type=req.body.type;
    const mtype=req.body.mtype;
    const userId=req.body.userId;
    const mediaId=req.body.movieId;
    // console.log(req.body);
    let list = await myList.findOne({ userId })
    // console.log(list);
    const payload={
        mediaType:mtype,
        mediaId:mediaId
    }
    console.log(payload);
    if (list) {
        const isDuplicate = list.lists[type].filter((item) => {
            return (item.mediaId==mediaId);
        })
        if (isDuplicate.length) {
          res.status(400).json({message:'Media item already exists in the list'});
          return
        }
        console.log(list.lists[type]);
        list.lists[type].push(payload) 
    }
    else {
        list = new myList({
            userId: userId,
            lists: {
                planned: [],
                watching: [],
                completed: [],
                favorites: []
            } 
        })
        list.lists[type].push(payload)
    }
    try {
        const newList = await list.save()
        res.status(201).json(newList)
    } catch (err) {
        res.status(400).json({ message: "Something went wrong" })
    }
}


exports.removeFromList = async (req, res) => {
    const type=req.body.type;
    const list = await myList.findOne({ userId: req.body.userId })
    if (list) {
        const index=list.lists[type].indexOf(req.body.movieId);
        if(index>-1){
            list.lists[type].splice(index,1);
        }
        else{
            res.status(400).json({ message: "Movie not found in list" })
        }
    }
    else {
        res.status(400).json({ message: "List not found" })
    }
    try {
        const newList = await list.save()
        res.status(201).json(newList)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }  

     
}

exports.updateList = async (req, res) => {
    const fromType=req.body.fromType;
    const toType=req.body.toType;
    const list = await myList.findOne({ userId: req.body.userId })
    if (list) {
        const index=list.lists[fromType].indexOf(req.body.movieId);
        if(index>-1){
            list.lists[fromType].splice(index,1);
            list.lists[toType].push(req.body.movieId)
        }
        else{
            res.status(400).json({ message: "Movie not found in list" })
        }
    }
    else {
        res.status(400).json({ message: "List not found" })
    }
    try {
        const newList = await list.save()
        res.status(201).json(newList)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.getLists = async (req, res) => {
    const list = await myList.findOne({ userId: req.body.userId })
    if (list) {
        res.status(200).json(list)
    }
    else {
        res.status(200).json({ message: "List not found" })
    }
}

exports.getUser = async (req, res) => {
    const list = await myList.findOne({ userId: req.body.userId })
    console.log(req.body);
    if (list) {
        res.status(200).json(list)
    }
    else {
        res.status(200).json({ message: "User not found" })
    }
}
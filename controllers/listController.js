const myList = require('../models/myLists');

exports.addToList = async (req, res) => {
    const type=req.body.type;
    let list = await myList.findOne({ userId: req.body.userId })
    console.log(list);
    if (list) {
        list.lists[type].push(req.body.movieId)
    }
    else {
        list = new myList({
            userId: req.body.userId,
            lists: {
                planned: [],
                watching: [],
                completed: [],
                favorites: []
            } 
        })
        list.lists[type].push(req.body.movieId)
        res.send(list);
    }
    try {
        const newList = await list.save()
        res.status(201).json(newList)
    } catch (err) {
        res.status(400).json({ message: err.message })
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
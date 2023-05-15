const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myListsSchema = new Schema({
    userId: String,
    lists: {
        planned:Array,
        watching:Array,
        completed:Array,
        favorites:Array
    }
});


module.exports = mongoose.model('WatchList', myListsSchema);
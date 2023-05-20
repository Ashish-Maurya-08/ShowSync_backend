const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myListsSchema = new Schema({
    userId: String,
    lists: {
        planned: [{
            mediaId: String,
            mediaType: String
        }],
        watching: [{
            mediaId: String,
            mediaType: String
        }],
        completed: [{
            mediaId: String,
            mediaType: String
        }],
        favorites: [{
            mediaId: String,
            mediaType: String
        }]
    }
});


module.exports = mongoose.model('WatchList', myListsSchema);
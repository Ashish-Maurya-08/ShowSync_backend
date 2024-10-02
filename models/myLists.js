const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myListsSchema = new Schema({
    userId: String,
    lists: {
        planned: [{
            mediaId: String,
            mediaType: String,
            poster: String
        }],
        watching: [{
            mediaId: String,
            mediaType: String,
            poster: String
        }],
        completed: [{
            mediaId: String,
            mediaType: String,
            poster: String
        }],
        favorites: [{
            mediaId: String,
            mediaType: String,
            poster: String
        }]
    }
});


module.exports = mongoose.model('WatchList', myListsSchema);
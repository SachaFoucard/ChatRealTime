const mongoose = require('mongoose');

const ChatRoom = new mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
})

const Room = mongoose.model('FavoritesRoom', ChatRoom)

module.exports = Room

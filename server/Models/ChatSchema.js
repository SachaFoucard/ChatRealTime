const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    members: {
        type: Array,
        required: true
    },
}, {
    timestamps: true // Add this for automatic timestamps
});

const ChatModel = mongoose.model('chats', ChatSchema);

module.exports = ChatModel;

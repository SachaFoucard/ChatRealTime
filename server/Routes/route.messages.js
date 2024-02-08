const app = require('express').Router();
const MessageModel = require('../Models/MessageModel')
const ChatModel = require('../Models/ChatSchema');

//create message
app.post('/message', async (req, res) => {
    const { chatId, senderId, text } = req.body
    const message = new MessageModel({
        chatId, senderId, text
    })
    try {
        const response = await message.save();
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

//get all messages from chatId of 2 users
app.get('/getChatAndMessages/:firstId/:secondId', async (req, res) => {
    const { firstId, secondId } = req.params;

    try {
        // Find the chat between the two users
        const chat = await ChatModel.findOne({ members: { $all: [firstId, secondId] } }); // find the chat
        
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        // Get all messages related to the chat
        const messages = await MessageModel.find({ chatId: chat._id });

        // Combine chat details and messages and return as a single response
        res.status(200).json({ messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = app
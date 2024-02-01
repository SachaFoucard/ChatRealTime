const app = require('express').Router();
const MessageModel = require('../Models/MessageModel')

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

//get all messages from the Chat
app.get('/getMessages/:chatId', async (req, res) => {
    const { chatId } = req.params

    try {
        const messages = await MessageModel.find({ chatId: chatId })
        res.status(200).json(messages)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

module.exports = app;
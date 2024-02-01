const app = require('express').Router();
const { json } = require('express');
const ChatModel = require('../Models/ChatSchema');
const User = require('../Models/User');

const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const { expiration } = require('./route.aws');

const BUCKET_REGION = process.env.BUCKET_REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.BUCKET_NAME;

const s3 = new S3Client({
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
    },
    region: BUCKET_REGION,
})

require('dotenv').config();

app.post('/createChat', async (req, res) => {
    const { firstId, secondId } = req.body

    try {
        const chat = await ChatModel.find({ members: { $all: [firstId, secondId] } })
        if (chat.length > 0) {
            console.log("chat already exist");
            res.status(200).json(chat)
        }
        else {
            const newChat = new ChatModel({
                members: [firstId, secondId]
            })
            const response = await newChat.save();
            res.status(201).json(response)
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'not succes' })
    }
})
// // find all history discussions 
// app.get('/findChat/:id', async (req, res) => {
//     const { id } = req.params; // Correctly destructure id from req.params
//     try {
//         console.log(id);
//         const chat = await ChatModel.find({ members: { $in: [id] } });
//         if (chat.length > 0) {
//             res.status(200).json(chat);

//         } else {
//             res.status(400).json({ message: 'any chat found from History' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

app.get('/findChat/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const chats = await ChatModel.find({ members: id }); // Find all chats where the user is a member
        if (chats.length > 0) {
            const users = [];
            for (let i = 0; i < chats.length; i++) {
                const chat = chats[i];
                const partnerId = chat.members.find(memberId => memberId !== id); // Find the chat partner's ID
                const user = await User.findOne({ _id: partnerId });
                if (user && user.picture) {
                    const url = await getSignedUrl(s3, new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: user.picture }, { expiresIn: expiration }));
                    user.picture = url;
                }
                users.push(user);
            }

            return res.status(200).json(users.filter(Boolean)); // Filter out any potential null or undefined users
        } else {
            res.status(400).json({ message: 'No chat found from history' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



// find discussion of user 
app.get('/findChat/:firstId/:secondId', async (req, res) => {
    const { firstId, secondId } = req.params;
    try {
        const chat = await ChatModel.findOne({ members: { $all: [firstId, secondId] } });
        res.status(200).json(chat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' }); // Corrected typo and added error message
    }
});




module.exports = app;
const express = require('express');
const cors = require('cors');
const MessageModel = require('./Models/MessageModel');
const dbConnect = require('./Utils/Database');
const app = express();

const { Server } = require("socket.io");

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Connect to the database
dbConnect();

// Define your routes
app.use('/api', require('./Routes/route.user'));
app.use('/api', require('./Routes/route.aws'));
app.use('/api', require('./Routes/route.chats'));
app.use('/api', require('./Routes/route.messages'));

const server = app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

const io = new Server(server, { cors: { origin: 'http://localhost:5173' } });

let allOnlineUsers = [];

// Socket.io event handling
io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    //listen to a connection 
    socket.on("AddNewUser", (userId) => {
        !allOnlineUsers.some((user) => user.userId === userId) &&
        allOnlineUsers.push({
            userId,
            socketId : socket.id
        });
        console.log('allOnlineUsers', allOnlineUsers);

        io.emit('GetOnlineUsers', allOnlineUsers);
    });
});

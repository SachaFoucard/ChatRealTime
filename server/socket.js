const { log } = require("console");
const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
    },
});

const onlineUsers = new Map();

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
   

    socket.on("join_room", (data) => {
        socket.join(data)
    })

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data)
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        onlineUsers.delete(socket.id);
        // Broadcast the updated online users list to all clients
        io.emit('onlineUsers', Array.from(onlineUsers.values()));
    });

});


server.listen(3000, () => {
    console.log("Socket Server running on port 5173");
});

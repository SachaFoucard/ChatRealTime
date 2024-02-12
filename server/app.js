const express = require('express');
const cors = require('cors');
const dbConnect = require('./Utils/Database');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to the database
dbConnect();

// Define your routes
app.use('/api', require('./Routes/route.user'));
app.use('/api', require('./Routes/route.aws'));
app.use('/api', require('./Routes/route.chats'));
app.use('/api', require('./Routes/route.messages'));

module.exports = app;
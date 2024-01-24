// Import necessary libraries
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

// Define the schema for the User
const userSchema = new mongoose.Schema({
    description: {
        type: String,
        required: false,
    },
    mail: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    backgroundImage: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    picture: {
        type: String,
        required: false
    },
    favContacts: {
        type: [mongoose.Types.ObjectId],
        require: false
    },
    contacts: {
        type: Array,
        require: false
    },
    favMessages: {
        type: Array,
        require: false
    },
    jobTitle:{
        type: String,
        required: false
    }

});

// Create the User model using the schema
const User = mongoose.model('users', userSchema);

module.exports = User;

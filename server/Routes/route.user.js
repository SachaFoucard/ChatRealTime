const route = require('express').Router();
const User = require('../Models/User');
const bcrypt = require('bcrypt');

require('dotenv').config();

route.post('/register', async (req, res) => {
  const { mail, username, password1, password2 } = req.body;

  try {
    const existingUserByEmail = await User.findOne({ mail });
    const existingUserByUsername = await User.findOne({ username });

    if (!existingUserByEmail && !existingUserByUsername && password1 === password2) {
      const hashedPassword = await bcrypt.hash(password1, parseInt(process.env.NBRSHASH));

      // Create a new user instance with all fields from the model
      const user = new User({
        mail,
        username,
        password: hashedPassword,
        description: req.body.description || '',
        phone: req.body.phone || '',
        backgroundImage: req.body.backgroundImage || '',
        location: req.body.location || '',
        picture: req.body.picture || '',
        favContacts: req.body.favContacts || [],
        contacts: req.body.contacts || [],
        favMessages: req.body.favMessages || [],
      });

      await user.save();
      return res.status(201).json(user);
    } else {
      return res.status(400).json({ message: 'User already exists or passwords do not match' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

route.post('/login', async (req, res) => {
  // Implement your login logic here
});

module.exports = route;

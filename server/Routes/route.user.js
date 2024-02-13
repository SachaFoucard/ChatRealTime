const route = require('express').Router();
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;

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
        gender: req.body.gender || '',
        firstName: req.body.firstName || '',
        lastName: req.body.lastName || '',
        location: req.body.location || '',
        picture: req.body.picture || '',
        favContacts: req.body.favContacts || [],
        contacts: req.body.contacts || [],
        favMessages: req.body.favMessages || [],
        jobTitle: req.body.jobTitle || ''
      });
      // if the user has a picture on his profil
      if (user.picture != '') {
        const url = await getSignedUrl(s3, new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: user.picture }, { expiresIn: expiration }));
        user.picture = url;
      }
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
  const { username, mail, password } = req.body;

  try {
    const user = await User.findOne({ $or: [{ username }, { mail }] });

    if (user && ( bcrypt.compare(password, user.password))) {
      if (user.picture != '') {
        const url = await getSignedUrl(s3, new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: user.picture }, { expiresIn: expiration }));
        user.picture = url
      }
      return res.status(201).json({ user });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

route.post('/update/:id', async (req, res) => {
  const _id = req.params.id;
  const user = await User.findById(_id)

  user.username = req.body.username || user.username;
  user.phone = req.body.phone || user.phone;
  user.jobTitle = req.body.jobTitle || user.jobTitle;
  user.picture = req.body.picture || user.picture;

  // make the keyName of the picture to a link to display the pic
  if (user.picture != '') {
    const url = await getSignedUrl(s3, new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: user.picture }, { expiresIn: expiration }));
    user.picture = url
  }

  const updatedUser = await user.save();
  res.status(201).json(updatedUser)
})


route.post('/addContactToFav/:id', async (req, res) => {
  const { user2 } = req.body;
  // Extract 'id' property from req.params
  const { id: userId } = req.params;

  try {
    const user1Instance = await User.findOne({ _id: userId, favContacts: { $in: [user2] } });

    if (user1Instance) {
      return res.status(200).json({ message: 'Hi User1, sorry but User2 is already in your favorites' });
    } else {
      const userToUpdate = await User.findOne({ _id: userId });
      if (!userToUpdate) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Ensure that favContacts is an array before pushing
      userToUpdate.favContacts = userToUpdate.favContacts || [];
      userToUpdate.favContacts.push(user2);

      await userToUpdate.save();

      return res.status(200).json(userToUpdate);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


route.get('/favoritesContacts/:id', async (req, res) => {
  const { user1 } = req.params.id;
  try {
    const user = await User.findOne(user1);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const ArrayUsers = [];

    const favContacts = user.favContacts || [];
    for (let i = 0; i < favContacts.length; i++) {
      const user = await User.findOne({ _id: favContacts[i]._id });
      if (user.picture != '') {
        const url = await getSignedUrl(s3, new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: user.picture }, { expiresIn: expiration }));
        user.picture = url
      }
      ArrayUsers.push(user)
    }

    return res.status(200).json({ ArrayUsers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

//get all contacts from user1
route.get('/getContacts/:id', async (req, res) => {
  const { id } = req.params; // Accessing params inside the route handler function
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const Allcontacts = [];

    const contacts = user.contacts || [];
    for (let i = 0; i < contacts.length; i++) {
      const userContact = await User.findOne({ _id: contacts[i]?._id });
      if (!userContact) {
        console.log(`User contact not found for ID: ${contacts[i]?._id}`);
        continue; // Skip to the next iteration
      }
      if (userContact.picture != '' ) {
        const url = await getSignedUrl(s3, new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: userContact.picture }, { expiresIn: expiration }));
        userContact.picture = url
      }
      Allcontacts.push(userContact);
    }
    return res.status(200).json({ Allcontacts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});



route.get('/searchUser/:input', async (req, res) => {
  const { input } = req.params
  const users = await User.findOne({ mail: input });
  if (users) {
    res.status(201).json(users);
  }
  else {
    res.status(404).json('any users in database with the name' + input)
  }
})

route.post('/addContact/:id', async (req, res) => {
  const { user2 } = req.body;
  // Extract 'id' property from req.params
  const { id: userId } = req.params;

  try {
    const user1Instance = await User.findOne({ _id: userId, contacts: { $in: [user2] } });

    if (user1Instance) {
      return res.status(401).json({ message: 'Hi User1, sorry but User2 is already in your contacts' });
    } else {
      const userToUpdate = await User.findOne({ _id: userId });
      if (!userToUpdate) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Ensure that favContacts is an array before pushing
      userToUpdate.contacts = userToUpdate.contacts || [];
      userToUpdate.contacts.push(user2);

      await userToUpdate.save();

      return res.status(200).json(userToUpdate);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = route;


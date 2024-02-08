const aws = require('express').Router();
const multer = require('multer')
const crypto = require('crypto');
const sharp = require('sharp');
const { Upload } = require('@aws-sdk/lib-storage');
const User = require('../Models/User')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')
const expiration = 60; // Set the expiration time in seconds

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


aws.post('/add', upload.single("image"), async (req, res) => {
    const { _id } = req.body; // Correct destructuring
    // Import the sharp module
    const sharp = require('sharp');

    try {
        const fileBuffer = await sharp(req.file.buffer)
            .resize({ height: 1920, width: 1080, fit: "contain" })
            .toBuffer();

        // Configure the upload details to send to S3
        const fileName = generateFileName();

        const img = new Upload({
            client: s3,
            params: {
                Bucket: BUCKET_NAME,
                Key: fileName,
                Body: fileBuffer,
                ContentType: req.file.mimetype,
            }
        });
        // Send the upload to S3
        await img.done();
        const user = await User.findByIdAndUpdate({ _id: _id }, { picture: fileName });
        res.status(201).json(user)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


aws.get('/posts/:id', async (req, res) => {
    const user = await User.find({ _id: req.params.id });

    const Allcontacts = [];

    const contacts = user.contacts || [];
    for (let i = 0; i < contacts.length; i++) {
        const userContact = await User.findOne({ _id: contacts[i]?._id });
        Allcontacts.push(userContact)
    }


    for (let user of Allcontacts) {
        const url = await getSignedUrl(s3, new GetObjectCommand({ Bucket: BUCKET_NAME, Key: user.picture }, { expiresIn: expiration }))
        user.picture = url;
    }

    res.status(201).json(Allcontacts);
})

module.exports =  aws, s3, expiration ;

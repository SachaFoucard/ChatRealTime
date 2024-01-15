const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

const dbConnect = require('./Utils/Database')

app.use(express.json());

dbConnect()

app.use('/api',require('./Routes/route.user'))

try {
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
} catch (error) {
    console.log(error);
}


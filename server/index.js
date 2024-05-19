const express = require('express');
require('dotenv').config();
const connection = require('./db.config');
const userRoute = require('./routes/userRoutes');
const postRoute = require('./routes/postRouter');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const PORT = process.env.PORT || 8000; 

const app = express();

const corsOption = {
    origin:"http://localhost:3000"
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors(corsOption))


// API routes
app.use('/users', userRoute);
app.use('/posts', postRoute); 

// Root route
app.get('/', (req, res) => {
    res.send('Hello from backend');
});

// Database connection
connection();

// Start the server
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

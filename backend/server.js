require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const upload = multer();

const productRoute = require('./routes/api/productRoute');

// ✅ Use environment variable only
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is not defined in .env!");
    process.exit(1);
}

// ✅ Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

// Check connection
db.once('open', () => {
    console.log('✅ Database connected successfully');
});

// Check for DB errors
db.on('error', (error) => {
    console.error('❌ MongoDB connection error:', error);
});

// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.use(upload.array());
app.use(cors());

// Routes
app.use('/api/products', productRoute);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});

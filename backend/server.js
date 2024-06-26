// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const noticeRoutes = require('./routes/noticeRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration
const corsOptions = {
    origin: "*",
    // credentials: true,
};

// Allow CORS with specified options
app.use(cors(corsOptions));

// Middleware 
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://gundeepsinghm:collegepassword@cluster0.rnnuthn.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// Use notice routes
app.use('/api/notices', noticeRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

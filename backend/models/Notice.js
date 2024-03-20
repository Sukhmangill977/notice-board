// models/Notice.js
const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imageUrl: String // Added imageUrl field
});

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;

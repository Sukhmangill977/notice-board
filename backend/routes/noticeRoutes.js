// routes/noticeRoutes.js
const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');

// Get all notices
router.get('/', async (req, res) => {
    try {
        const notices = await Notice.find();
        res.json(notices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new notice
router.post('/', async (req, res) => {
    const notice = new Notice({
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl // Added imageUrl field
    });

    try {
        const newNotice = await notice.save();
        res.status(201).json(newNotice);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.delete('/:id', async (req, res) => {
  try {
    await Notice.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Notice deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

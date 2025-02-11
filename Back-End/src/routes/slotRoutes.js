const express = require('express');
const slotController = require('../controllers/slotController');

const router = express.Router();

router.get('/slots', slotController.getSlots);

module.exports = router;
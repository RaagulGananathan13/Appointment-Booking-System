const express = require('express');
const adminController = require('../controllers/adminController');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/admin/login', adminController.login);
router.get('/admin/appointments', adminAuth, adminController.getAllAppointments);
router.post('/admin/slots', adminAuth, adminController.addSlot);

module.exports = router;
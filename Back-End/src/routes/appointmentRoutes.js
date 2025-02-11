const express = require('express');
const appointmentController = require('../controllers/appointmentController');

const router = express.Router();

router.post('/appointments', appointmentController.bookAppointment);
router.get('/appointments', appointmentController.getAppointments);
router.delete('/appointments/:id', appointmentController.cancelAppointment);

module.exports = router;
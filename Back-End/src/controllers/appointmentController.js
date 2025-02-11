const db = require('../config/db');

exports.bookAppointment = async (req, res) => {
  const { slot_id, user_name, user_contact } = req.body;

  try {
    // Check if slot is available
    const [slot] = await db.query('SELECT * FROM slots WHERE id = ? AND is_booked = FALSE', [slot_id]);
    if (slot.length === 0) {
      return res.status(400).json({ error: 'Slot is already booked or does not exist' });
    }

    // Book the slot
    await db.query('INSERT INTO appointments (slot_id, user_name, user_contact) VALUES (?, ?, ?)', [slot_id, user_name, user_contact]);
    await db.query('UPDATE slots SET is_booked = TRUE WHERE id = ?', [slot_id]);

    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  const { user_contact } = req.query;

  try {
    const [appointments] = await db.query(
      'SELECT appointments.*, slots.date, slots.start_time, slots.end_time FROM appointments JOIN slots ON appointments.slot_id = slots.id WHERE user_contact = ?',
      [user_contact]
    );
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const [appointment] = await db.query('SELECT * FROM appointments WHERE id = ?', [id]);
    if (appointment.length === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    await db.query('DELETE FROM appointments WHERE id = ?', [id]);
    await db.query('UPDATE slots SET is_booked = FALSE WHERE id = ?', [appointment[0].slot_id]);

    res.json({ message: 'Appointment canceled successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
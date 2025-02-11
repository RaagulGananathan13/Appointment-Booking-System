const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [admin] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);
    if (!admin.length) return res.status(400).json({ error: 'Invalid username or password' });

    const validPassword = await bcrypt.compare(password, admin[0].password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid username or password' });

    const token = jwt.sign({ id: admin[0].id, role: 'admin' }, 'your_jwt_secret');
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const [appointments] = await db.query(
      'SELECT appointments.*, slots.date, slots.start_time, slots.end_time FROM appointments JOIN slots ON appointments.slot_id = slots.id'
    );
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addSlot = async (req, res) => {
  const { date, start_time, end_time } = req.body;

  try {
    await db.query('INSERT INTO slots (date, start_time, end_time) VALUES (?, ?, ?)', [date, start_time, end_time]);
    res.status(201).json({ message: 'Slot added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
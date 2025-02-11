const db = require('../config/db');

exports.getSlots = async (req, res) => {
  try {
    const [slots] = await db.query('SELECT * FROM slots WHERE is_booked = FALSE');
    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
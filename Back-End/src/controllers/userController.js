const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (!user.length) return res.status(400).json({ error: 'Invalid username or password' });

    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid username or password' });

    const token = jwt.sign({ id: user[0].id, role: 'user' }, 'your_jwt_secret');
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
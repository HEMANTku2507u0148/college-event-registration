const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.db');

db.run(`
CREATE TABLE IF NOT EXISTS registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fullName TEXT,
  email TEXT,
  department TEXT,
  eventName TEXT,
  notes TEXT
)
`);

app.post('/register', (req, res) => {
  const { fullName, email, department, eventName, notes } = req.body;

  db.run(
    `INSERT INTO registrations (fullName, email, department, eventName, notes)
     VALUES (?, ?, ?, ?, ?)`,
    [fullName, email, department, eventName, notes],
    function (err) {
      if (err) return res.status(500).json({ message: "Error" });

      res.json({ message: "Registration Successful ✅" });
    }
  );
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
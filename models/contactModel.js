const pool = require("../config/db");

async function createContact({ name, email, phone, message }) {
  const [result] = await pool.query(
    "INSERT INTO contact_us (name, email, phone, message) VALUES (?, ?, ?, ?)",
    [name, email, phone || null, message]
  );
  return result.insertId;
}

module.exports = {
  createContact,
};
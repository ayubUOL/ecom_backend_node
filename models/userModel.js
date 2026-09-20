const pool = require("../config/db");

async function findByUsername(username) {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    return rows[0] || null;
}

async function findByEmail(email) {
    const [rows] = await pool.execute(
        "SELECT * FROM users WHERE email = ? LIMIT 1",
        [email]
    );

    return rows[0] || null;
}

async function createUser({ username, email, password, role }) {
    const [result] = await pool.execute(
        `INSERT INTO users 
        (username, email, password, role)
        VALUES (?, ?, ?, ?)`,
        [username, email, password, role]
    );

    return {
        id: result.insertId,
        username,
        email,
        role,
    };
}

module.exports = { findByUsername, findByEmail, createUser };
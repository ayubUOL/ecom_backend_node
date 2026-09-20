const pool = require("../config/db");

async function getAllProducts() {
  const [rows] = await pool.query("SELECT * FROM products ORDER BY created_at DESC");
  return rows;
}

async function getProductById(id) {
  const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
  return rows[0] || null;
}

async function createProduct(data) {
  const { id, brand, name, price, image, alt, badge, category, stock } = data;

  await pool.query(
    `INSERT INTO products (id, brand, name, price, image, alt, badge, category, stock)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, brand, name, price, image, alt || null, badge || null, category, stock ?? 0]
  );

  return id;
}

async function updateProduct(id, data) {
  const { brand, name, price, image, alt, badge, category, stock } = data;

  const [result] = await pool.query(
    `UPDATE products
     SET brand = ?, name = ?, price = ?, image = ?, alt = ?, badge = ?, category = ?, stock = ?
     WHERE id = ?`,
    [brand, name, price, image, alt, badge || null, category, stock ?? 0, id]
  );

  return result.affectedRows > 0;
}

async function deleteProduct(id) {
  const [result] = await pool.query("DELETE FROM products WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
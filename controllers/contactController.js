const contactModel = require("../models/contactModel");

async function submitContact(req, res) {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email and message are required",
    });
  }

  try {
    const insertId = await contactModel.createContact({ name, email, phone, message });

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      data: { id: insertId, name, email, phone, message },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to save submission" });
  }
}

module.exports = {
  submitContact,
};
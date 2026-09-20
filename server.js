require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./config/db");
const path = require("path");
const PORT = 4000;

const productRoutes = require("./routes/productRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

// Middleware
app.use(cors());    // Enable CORS
app.use(express.json());

// Routes
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/api/upload", uploadRoutes);

app.use("/api/products", productRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);

// Start server
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
        method: req.method,
        path: req.originalUrl
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
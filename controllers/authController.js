const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

async function login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const user = await userModel.findByUsername(username);
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            user: { id: user.id, username: user.username, email: user.email, role: user.role },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Login failed" });
    }
}

async function signup(req, res) {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Username, email and password are required",
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            message: "Password must be at least 8 characters",
        });
    }

    try {
        // Check if username already exists
        const existingUsername = await userModel.findByUsername(name);

        if (existingUsername) {
            return res.status(409).json({
                message: "Username already exists",
            });
        }

        // Check if email already exists
        const existingEmail = await userModel.findByEmail(email);

        if (existingEmail) {
            return res.status(409).json({
                message: "Email already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await userModel.createUser({
            username: name,
            email,
            password: hashedPassword,
            role: "customer",
        });

        // Generate JWT
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // Return user + JWT
        res.status(201).json({
            message: "Account created successfully",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("Signup error:", err);

        res.status(500).json({
            message: "Signup failed",
        });
    }
}

module.exports = { login, signup };
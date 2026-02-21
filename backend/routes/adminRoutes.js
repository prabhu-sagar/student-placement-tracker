const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create-coordinator', authMiddleware, async (req, res) => {
   console.log("REQ USER:", req.user);
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCoordinator = new User({
        name,
        email,
        password: hashedPassword,
        role: "coordinator"
    });

    await newCoordinator.save();

    res.json({ message: "Coordinator created successfully" });
});

module.exports = router;
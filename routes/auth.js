const User = require("../models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose"); 
const router = require("express").Router();
const {generateToken}= require("../middleware/authMiddleware")
router.post("/register", async (req, res) => {
    const { user_fname, user_lname, email, password } = req.body;
    if (!user_fname || !user_lname || !email || !password) {
        return res.status(400).json({
            status: false,
            message: "Please fill in all fields",
        });
    }
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: "Email already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            user_fname,
            user_lname,
            email,
            password: hashedPassword,
            user_id: new mongoose.Types.ObjectId()
        });

        res.status(201).json({
            status: true,
            message: "User created successfully",
            user: user,
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message, 
        });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({
                status: false,
                message: "Invalid credentials",
            });
        }
        const token = generateToken(user);
        res.json({
            status: true,
            token: token,
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message,
        });
    }
});

module.exports = router;

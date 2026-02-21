const bcrypt = require('bcrypt');
const User = require('../models/User');

const createAdmin = async () => {
    try {
        const adminExist = await User.findOne({ role: "admin" });

        if (!adminExist) {
            const hashedPassword = await bcrypt.hash("admin123", 10);

            await User.create({
                name: "Admin",
                email: "admin@gmail.com",
                password: hashedPassword,
                role: "admin"
            });

            console.log("✅ Admin created");
        } else {
            console.log("⚡ Admin already exists");
        }

    } catch (err) {
        console.log(err);
    }
};

module.exports = createAdmin;
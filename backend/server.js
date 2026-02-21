require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDb = require('./database/db');
const createAdmin = require('./utils/createAdmin');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);


// 🔥 Connect DB first, then create admin, then start server
connectToDb()
    .then(() => {
        createAdmin();

        app.listen(process.env.PORT || 5000, () => {
            console.log("Server running on port " + (process.env.PORT || 5000));
        });
    })
    .catch(err => {
        console.log("DB Connection Failed", err);
    });
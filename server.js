const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(express.json());
app.use(cors());

/* ================= TEST ROUTE ================= */

app.get("/", (req, res) => {
    res.send("Backend is running ✅");
});

/* ================= CONNECT TO MONGODB ================= */

mongoose.connect("mongodb://127.0.0.1:27017/studentplacementDB")
.then(() => console.log("MongoDB Connected Successfully ✅"))
.catch((err) => console.log("Connection Error ❌", err));

/* =====================================================
                    ADMIN SECTION
===================================================== */

const adminSchema = new mongoose.Schema({
    adminId: { type: String, required: true },
    password: { type: String, required: true }
}, { collection: "admin" });

const Admin = mongoose.model("Admin", adminSchema);

/* ================= ADMIN LOGIN ================= */

app.post("/Admin_login", async (req, res) => {
    try {
        const { adminId, password } = req.body;

        if (!adminId || !password)
            return res.status(400).json({ success: false, message: "Missing fields" });

        const admin = await Admin.findOne({ adminId: adminId.trim() });

        if (!admin || admin.password !== password.trim())
            return res.status(401).json({ success: false, message: "Invalid credentials" });

        res.json({ success: true });

    } catch (error) {
        console.error("Admin Login Error:", error);
        res.status(500).json({ success: false });
    }
});

/* =====================================================
                COORDINATOR SECTION
===================================================== */

const coordinatorSchema = new mongoose.Schema({
    coordinatorId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String, required: true }
}, { collection: "coordinators" });

const Coordinator = mongoose.model("Coordinator", coordinatorSchema);

/* ================= ADD COORDINATOR ================= */

app.post("/add_coordinator", async (req, res) => {
    try {
        const { coordinatorId, name, email, password } = req.body;

        if (!coordinatorId || !name || !password)
            return res.status(400).json({ success: false, message: "Missing required fields" });

        const existing = await Coordinator.findOne({ coordinatorId: coordinatorId.trim() });

        if (existing)
            return res.status(400).json({ success: false, message: "Coordinator already exists" });

        const newCoordinator = new Coordinator({
            coordinatorId: coordinatorId.trim(),
            name: name.trim(),
            email: email ? email.trim() : "",
            password: password.trim()
        });

        await newCoordinator.save();

        res.json({ success: true });

    } catch (error) {
        console.error("Add Coordinator Error:", error);
        res.status(500).json({ success: false });
    }
});

/* ================= GET ALL COORDINATORS ================= */

app.get("/manage_coordinators", async (req, res) => {
    try {
        const coordinators = await Coordinator.find();
        res.json(coordinators);
    } catch (error) {
        console.error("Fetch Coordinators Error:", error);
        res.status(500).json({ success: false });
    }
});

/* ================= DELETE COORDINATOR ================= */

app.delete("/delete_coordinator/:id", async (req, res) => {
    try {
        await Coordinator.deleteOne({ coordinatorId: req.params.id });
        res.json({ success: true });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ success: false });
    }
});

/* ================= COORDINATOR LOGIN ================= */

app.post("/placement_coordinator_login", async (req, res) => {
    try {
        const { coordinatorId, password } = req.body;

        if (!coordinatorId || !password)
            return res.status(400).json({ success: false, message: "Missing fields" });

        const coordinator = await Coordinator.findOne({
            coordinatorId: coordinatorId.trim()
        });

        if (!coordinator || coordinator.password !== password.trim())
            return res.status(401).json({ success: false });

        res.json({
            success: true,
            name: coordinator.name
        });

    } catch (error) {
        console.error("Coordinator Login Error:", error);
        res.status(500).json({ success: false });
    }
});

/* =====================================================
                    STUDENT SECTION
===================================================== */

const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, required: true },
    year: { type: String, required: true },
    cgpa: { type: Number, required: true },
    password: { type: String, required: true }
}, { collection: "students" });

const Student = mongoose.model("Student", studentSchema);

/* ================= STUDENT REGISTER ================= */

app.post("/student_register", async (req, res) => {
    try {
        const {
            studentId,
            name,
            email,
            phone,
            department,
            year,
            cgpa,
            password
        } = req.body;

        if (!studentId || !name || !email || !phone || !department || !year || !cgpa || !password)
            return res.status(400).json({ success: false, message: "Missing fields" });

        const existingStudent = await Student.findOne({
            studentId: studentId.trim()
        });

        if (existingStudent)
            return res.status(400).json({ success: false, message: "Student already exists" });

        const newStudent = new Student({
            studentId: studentId.trim(),
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            department: department.trim(),
            year: year.trim(),
            cgpa: parseFloat(cgpa),
            password: password.trim()
        });

        await newStudent.save();

        res.json({ success: true });

    } catch (error) {
        console.error("Student Register Error:", error);
        res.status(500).json({ success: false });
    }
});

/* ================= STUDENT LOGIN ================= */

app.post("/student_login", async (req, res) => {
    try {
        const { studentId, password } = req.body;

        if (!studentId || !password)
            return res.status(400).json({ success: false, message: "Missing fields" });

        const student = await Student.findOne({
            studentId: studentId.trim()
        });

        if (!student || student.password !== password.trim())
            return res.status(401).json({ success: false, message: "Invalid credentials" });

        // ✅ SEND FULL STUDENT DATA
        res.json({
            success: true,
            studentId: student.studentId,
            name: student.name,
            email: student.email,
            phone: student.phone,
            department: student.department,
            year: student.year,
            cgpa: student.cgpa
        });

    } catch (error) {
        console.error("Student Login Error:", error);
        res.status(500).json({ success: false });
    }
});
/* =====================================================
                    START SERVER
===================================================== */

app.listen(5000, () => {
    console.log("Server running on port 5000 🚀");
});
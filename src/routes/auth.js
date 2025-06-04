const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const nodemailer = require("nodemailer");
const passport = require("passport");
const User = require("../models/user");

const router = express.Router();

require("dotenv").config(); // تحميل المتغيرات من ملف .env

// Nodemailer transporter setup with unified env variables and tls option
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// تسجيل مستخدم جديد
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // التحقق من إدخال جميع البيانات
    if (!name || !email || !password) {
      return res.status(400).json({ message: "يرجى إدخال جميع الحقول" });
    }

    // التحقق من وجود المستخدم مسبقًا
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "البريد الإلكتروني مسجل بالفعل" });
    }

    // تشفير كلمة المرور
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // إنشاء المستخدم الجديد
    user = new User({
      name,
      email,
      password: hashedPassword,
    }); 

    await user.save();

    // إنشاء JSON Web Token (JWT)
    require("dotenv").config();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d", // صلاحية لمدة 7 أيام
    });

    res.status(201).json({ message: "تم إنشاء الحساب بنجاح", token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "حدث خطأ في السيرفر" });
  }
});

// 🔹 تسجيل الدخول
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // البحث عن المستخدم
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "البريد الإلكتروني غير صحيح" });

    // Validate that password is a string
    if (typeof password !== 'string') {
        return res.status(400).json({ message: "Password must be a string" });
    }

    // التحقق من صحة كلمة المرور
    if (typeof password !== 'string') {
        return res.status(400).json({ message: "Password must be a string" });
    }

    // التحقق من صحة كلمة المرور
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: "كلمة المرور غير صحيحة" });

    // إنشاء Token باستخدام JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔹 تحديث معلومات المستخدم (محمي بالتوكن)
router.put("/update", authMiddleware, async (req, res) => {

  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) return res.status(404).json({ message: "المستخدم غير موجود" });

    if (name) user.name = name;
    if (email) user.email = email;

    // إذا كان هناك كلمة مرور جديدة، نقوم بتشفيرها
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({ message: "تم تحديث المعلومات بنجاح", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// إعادة تعيين كلمة المرور

// 🔹 إرسال رابط إعادة تعيين كلمة المرور
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "البريد غير مسجل" });

    // إنشاء توكن مؤقت لإعادة التعيين
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    // رابط إعادة التعيين
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    // إرسال البريد الإلكتروني
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "إعادة تعيين كلمة المرور",
      text: `لإعادة تعيين كلمة المرور، استخدم الرابط التالي: ${resetLink}`,
    });

    res.json({ message: "تم إرسال البريد الإلكتروني" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// قبول التوكن وإعادة تعيين كلمة المرور:
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ message: "المستخدم غير موجود" });

    // تحديث كلمة المرور
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "تم تحديث كلمة المرور بنجاح" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔹 تسجيل الدخول عبر Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// 🔹 استلام بيانات Google بعد تسجيل الدخول
router.get("/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
  const token = jwt.sign({ userId: req.user._id, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.redirect(`http://localhost:3000/login-success?token=${token}&role=${req.user.role}`);
});

// 🔹 تسجيل الدخول عبر Facebook
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

// 🔹 استلام بيانات Facebook بعد تسجيل الدخول
router.get("/facebook/callback", passport.authenticate("facebook", { session: false }), (req, res) => {
  const token = jwt.sign({ userId: req.user._id, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.redirect(`http://localhost:3000/login-success?token=${token}&role=${req.user.role}`);
});

// تسجيل الخروج 
router.post("/logout", authMiddleware, (req, res) => {
  res.json({ message: "✅ تم تسجيل الخروج بنجاح" });
});

module.exports = router;

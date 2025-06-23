const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./src/routes/auth");
const orderRoutes = require("./src/routes/order");
const productRoutes = require("./src/routes/products");

require("dotenv").config();

dotenv.config();
const app = express();

app.use(express.json()); // لتحليل بيانات JSON  
app.use(cors()); // السماح بالوصول من أي نطاق

app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
  
// ربط قاعدة البيانات MongoDB
/* mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Alzain-Tea", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ متصل بقاعدة البيانات"))
  .catch(err => console.error("❌ خطأ في الاتصال بقاعدة البيانات:", err));
*/
// ربط قاعدة البيانات MongDB atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// الدفع
const paymentRoutes = require("./src/routes/payment");
app.use("/api/payment", paymentRoutes);

const cartRoutes = require("./src/routes/cart");
app.use("/api/cart", cartRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An unexpected error occurred." });
});

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 السيرفر يعمل على المنفذ ${PORT}`));

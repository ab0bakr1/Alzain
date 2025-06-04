const express = require("express");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware"); // استيراد ميدلوير الحماية

const router = express.Router();

// 🔹 إضافة منتج جديد (محمي بالتوكن)
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { name, description, price, image, category, stock } = req.body;
    
    const newProduct = new Product({ name, description, price, image, category, stock });
    await newProduct.save();

    res.status(201).json({ message: "تمت إضافة المنتج بنجاح", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔹 جلب جميع المنتجات (بدون حماية، يمكن لأي شخص رؤيتها)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔹 حذف منتج (محمي بالتوكن)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "تم حذف المنتج" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

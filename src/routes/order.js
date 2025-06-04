const express = require("express");
const Order = require("../models/order");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

/** 
 * 🛒 إنشاء طلب جديد (يجب أن يكون المستخدم مسجلاً) 
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { products, total } = req.body;

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized: userId missing in token" });
    }

    const order = new Order({
      user: req.user.userId,
      products,
      total,
    });

    await order.save();
    res.status(201).json({ message: "✅ تم تقديم الطلب بنجاح!", order });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "❌ حدث خطأ أثناء تقديم الطلب", error });
  }
});

/** 
 * 📋 جلب جميع الطلبات للمستخدم الحالي 
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate("products.productId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "❌ حدث خطأ أثناء جلب الطلبات", error });
  }
});

/** 
 * 📦 جلب جميع الطلبات (للمشرف فقط) 
 */
router.get("/all", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "❌ غير مسموح!" });
    }
    const orders = await Order.find().populate("products.productId").populate("user", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "❌ حدث خطأ أثناء جلب الطلبات", error });
  }
});

/** 
 * 🔄 تحديث حالة الطلب (Admin فقط) 
 */
router.put("/:orderId", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "❌ غير مسموح!" });
    }

    const { status } = req.body;
    const validStatuses = ["Pending", "Processing", "Shipped", "Delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "❌ حالة غير صالحة" });
    }

    const order = await Order.findByIdAndUpdate(req.params.orderId, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: "❌ الطلب غير موجود" });
    }

    res.json({ message: "✅ تم تحديث حالة الطلب بنجاح", order });
  } catch (error) {
    res.status(500).json({ message: "❌ حدث خطأ أثناء تحديث الطلب", error });
  }
});

/** 
 * ❌ حذف الطلب (Admin فقط) 
 */
router.delete("/:orderId", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "❌ غير مسموح!" });
    }

    const order = await Order.findByIdAndDelete(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "❌ الطلب غير موجود" });
    }

    res.json({ message: "✅ تم حذف الطلب بنجاح" });
  } catch (error) { 
    res.status(500).json({ message: "❌ حدث خطأ أثناء حذف الطلب", error });
  }
});

module.exports = router;

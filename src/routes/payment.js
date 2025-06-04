const express = require("express");
const Stripe = require("stripe");
const router = express.Router();
const Order = require("../models/order");
const nodemailer = require("nodemailer");

require("dotenv").config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
 
// إعداد transporter Nodemailer (إعادة الاستخدام من auth.js أو التكوين هنا)
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

router.post("/checkout", async (req, res) => {
  const { amount } = req.body;
   
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // تحويل المبلغ إلى سنتات
      currency: "usd",
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe payment error:", error);
    res.status(500).json({ message: "❌ فشل الدفع", error: error.message });
  }
});

// نقطة نهاية جديدة لتأكيد الدفع وإكمال عملية الشراء
router.post("/confirm", async (req, res) => {
  const { paymentIntentId, orderId } = req.body;

  console.log("Received payment confirmation request with paymentIntentId:", paymentIntentId, "and orderId:", orderId);

  if (!paymentIntentId || !orderId) {
    return res.status(400).json({ message: "Missing paymentIntentId or orderId" });
  }

  try {
    // استرداد نية الدفع من Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ message: "Payment not successful" });
    }

    // تحديث حالة الطلب إلى المعالجة 
    const order = await Order.findById(orderId).populate("user");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "processing";
    await order.save();

    // محاكاة السحب البنكي
    console.log(`Withdrawing ${order.total} from bank for order ${orderId}`);

    // إرسال إشعار بالبريد الإلكتروني إلى المستخدم
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: order.user.email,
      subject: "Order Confirmation",
      text: `Your order with ID ${orderId} has been confirmed and is being processed.`,
    };

    await transporter.sendMail(mailOptions);

    // محاكاة إيداع الأموال
    console.log(`Deposited ${order.total} to account for order ${orderId}`);

    res.json({ message: "Purchase completed, withdrawal made, notification sent, and money deposited." });
  } catch (error) {
    console.error("Payment confirmation error:", error);
    res.status(500).json({ message: "Error confirming payment", error: error.message });
  }
});

module.exports = router;

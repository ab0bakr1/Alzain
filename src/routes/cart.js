const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const authMiddleware = require('../middleware/authMiddleware');

// Get cart for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId }).populate('items.productId');
    if (!cart) {
      return res.json({ items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get cart', error });
  }
});

// Add or remove item in cart (toggle)
router.post('/add', authMiddleware, async (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({ message: 'Invalid productId' });
  }
  try {
    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      cart = new Cart({ userId: req.user.userId, items: [] });
    }
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      // Product exists, remove it
      cart.items.splice(itemIndex, 1);
    } else {
      // Product not in cart, add it with quantity 1
      cart.items.push({ productId, quantity: 1 });
    }
    await cart.save();
    await cart.populate('items.productId');
    res.json(cart);
  } catch (error) {
    console.error('Error toggling cart item:', error);
    res.status(500).json({ message: 'Failed to toggle cart item', error: error.message });
  }
});

// Update quantity of a product in cart
router.patch('/update-quantity', authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || typeof quantity !== 'number' || quantity < 1) {
    return res.status(400).json({ message: 'Invalid productId or quantity' });
  }
  try {
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    // Populate product details before sending response
    await cart.populate('items.productId');
    res.json(cart);
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    res.status(500).json({ message: 'Failed to update cart item quantity', error: error.message });
  }
});

module.exports = router;

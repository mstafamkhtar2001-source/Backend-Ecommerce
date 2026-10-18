const Cart = require('../models/cartModel');

// 1. جلب السلة
const fetchCart = async (req, res) => {
  try {
    // بما إننا شلنا الـ Middleware، هنضطر نجرب بـ user id ثابت مؤقتاً للتجربة
    // في الحقيقة، لازم الـ Middleware عشان الـ req.user يكون موجود
    const userId = req.user.id; 
    const cart = await Cart.findOne({ userId });
    
    res.status(200).json(cart ? cart : { items: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. إضافة للسلة
const addToCart = async (req, res) => {
  
  try {
    const userId = req.user.id;
    const { id, name, price, Qty, image } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ id, name, price, Qty, image }] });
    } else {
      cart.items.push({ id, name, price, Qty, image });
    }

    await cart.save();
    res.status(200).json({ message: "تمت الإضافة", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. حذف من السلة
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = cart.items.filter(item => item.id !== id);
      await cart.save();
    }
    res.status(200).json({ message: "تم الحذف" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { fetchCart, addToCart, removeFromCart };
const express = require('express');
const router = express.Router();
const { fetchCart, addToCart, removeFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');
// مسارات السلة مباشرة بدون حماية مؤقتاً
router.get('/',authMiddleware, fetchCart);
router.post('/add',authMiddleware, addToCart);
router.delete('/remove/:id',authMiddleware, removeFromCart);

module.exports = router;
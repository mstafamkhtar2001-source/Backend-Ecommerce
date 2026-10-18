const express = require('express'); // 1. لازم تستدعي express
const router = express.Router(); // 2. لازم تعرف الـ router
const { login,register,getAllUsers} = require('../controllers/authController');

router.post('/login', login);
router.post('/register', register);
router.get('/users', getAllUsers);


module.exports = router; // 3. لازم تعمل تصدير للراوتر
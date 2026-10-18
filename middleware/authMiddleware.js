const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // 1. استثناء طلبات الـ OPTIONS (عشان المتصفح ميعلقش)
    if (req.method === 'OPTIONS') return next();

    // 2. استخراج التوكن من الـ Header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // 3. التحقق من التوكن باستخدام نفس القيمة الثابتة
        const JWT_SECRET = "super_secret_value_123"; 
        const decoded = jwt.verify(token, JWT_SECRET);
        
        req.user = decoded; // حفظ بيانات المستخدم
        next(); // المرور للخطوة التالية
    } catch (error) {
        console.log("Token verification error:", error.message);
        res.status(400).json({ message: 'Invalid token.', error: error.message });
    }
};

module.exports = authMiddleware;
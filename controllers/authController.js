const User = require('../models/userModel.js'); // تأكد من مسار الموديل
const bcrypt = require('bcrypt');

// authController.js
const jwt = require('jsonwebtoken'); // 1. استدعي المكتبة
const JWT_SECRET = "super_secret_value_123"; // ده مفتاح التشفير (بعدين حطه في ملف .env)

const login = async (req, res) => {
    try {
        console.log("البيانات الى وصلت:",req.body);
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "الإيميل غير موجود" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "كلمة المرور غير صحيحة" });

        user.lastlogin=Date.now();
        await user.save();


        // 2. توليد التوكن
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
                                                                             //مدة الصلاحية بتاعت التوكين
        // 3. إرسال التوكن والدور
        res.status(200).json({
            message: "تم تسجيل الدخول بنجاح",
            token,
            email: user.email
        });
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ في السيرفر", error: error.message });
    }
};
// دالة لجلب كل المستخدمين للعرض فقط
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'email role createdAt updatedAt lastlogin');
    
    // تعديل بسيط: لو مستخدم قديم مش عنده createdAt، نديّه تاريخ النهارده كافتراضي عشان ما تظهرش "غير محدد"
    const formattedUsers = users.map(user => ({
      _id: user._id,
      email: user.email,
      role: user.role,
     updatedAt: user.lastlogin || user.createdAt || user._id.getTimestamp() // ObjectId في مونجو بيشيل جوه منه وقت إنشائه الحقيقي!
    }));

    res.status(200).json(formattedUsers);
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ في السيرفر", error: error.message });
  }
};

// دالة التسجيل

// دالة التسجيل
// دالة التسجيل بعد التعديل
const register = async (req, res) => {
    try {
        console.log("البيانات الى وصلت:",req.body);
        const { email, password, role } = req.body; // ضفنا الـ role هنا

        // تشفير الباسورد قبل حفظه
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
       
        // إنشاء مستخدم جديد وحفظ الـ role
        const newUser = new User({ 
            email, 
            password: hashedPassword, 
            role: role || 'user' // لو مبعتناش role هيسجل كـ user تلقائياً
            

        });


      
        await newUser.save();
        res.status(201).json({ message: "تم إنشاء الحساب بنجاح!" });
    } catch (error) {
       
        res.status(500).json({ message: "خطأ في التسجيل", error: error.message });
    }
};

module.exports = { login, register,getAllUsers }; // حدثنا الـ export هنا
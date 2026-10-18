const OpenAI = require('openai');

// تهيئة عميل OpenAI باستخدام المفتاح الموجود في ملف الـ .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// دالة معالجة طلبات الذكاء الاصطناعي
const handleAIQuery = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: 'الرجاء إدخال النص المطلوب (prompt).' });
        }
        
        // رد تجريبي مؤقت للتأكد من عمل الواجهة والاتصال بدون مشاكل الرصيد
        const aiReply = `أهلاً بك! لقد تلقيت سؤالك: "${prompt}". أنا مساعد المتجر الذكي وجاهز لمساعدتك في تنظيم المخزون وإدارة المتجر بكل كفاءة!`;
        
        res.status(200).json({ success: true, reply: aiReply });
    } catch (error) {
        console.error('AI Error Details:', error.message);
        res.status(500).json({ error: 'حدث خطأ أثناء معالجة الطلب.' });
    }
};

module.exports = { handleAIQuery };
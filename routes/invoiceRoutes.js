const express = require('express');
const router = express.Router();
// ركز هنا: الاسم بالـ c المظبوطة
const invoiceController = require('../controllers/incoiceController'); 
const authMiddleware = require('../middleware/authMiddleware'); // استيراد الـ
// دلوقتي تقدر تستخدم المتغير ده لكل الدوال
router.get('/',authMiddleware, invoiceController.getAllInvoices);
router.post('/', invoiceController.createInvoice);
router.delete('/:invoiceNumber', invoiceController.deleteInvoice);
router.put('/:invoiceNumber', invoiceController.updateInvoice);



// الحماية هنا: الـ Accounting مش هيفتح غير لو بعت التوكين السليم
router.get('/accounting', authMiddleware, (req, res) => {
  res.send('Welcome to Accounting Data!');
  });
module.exports = router;
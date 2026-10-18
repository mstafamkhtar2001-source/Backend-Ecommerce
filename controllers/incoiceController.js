const { json } = require('express');
const Invoice = require('../models/invoiceModel');
const Joi = require('joi');

const validateInvoice = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
        invoiceNumber: Joi.number().optional(),
        paymentMethod: Joi.string().optional(),
        items: Joi.any().optional(),
        total: Joi.any().optional(),
        tax: Joi.any().optional(),
        discount: Joi.any().optional(),
        date: Joi.any().optional(),
        uniqueId: Joi.any().optional(),
        card: Joi.any().optional(),
         cvv: Joi.any().optional(),
         productName: Joi.any().optional(), 
       
        Qty: Joi.any().optional(),         
         subtotal: Joi.any().optional()
 
    });
    return schema.validate(data);
};

const getNextInvoiceNumber = async () => {
    const lastInvoice = await Invoice.findOne({ invoiceNumber: { $exists: true } }).sort({ invoiceNumber: -1 });
    if (lastInvoice && typeof lastInvoice.invoiceNumber === 'number') {
        return lastInvoice.invoiceNumber + 1;
    } else {
        return 1;
    }
};

exports.createInvoice = async (req, res) => {
    try {
        console.log("البيانات اللي وصلت للباك إيند:", req.body);

        // 1. Validation (موجودة عندك)
        const { error } = validateInvoice(req.body);
        if (error) {
            console.error("خطأ Validation:", error.details[0].message);
            return res.status(400).json({ message: error.details[0].message });
        }

        const nextNumber=await getNextInvoiceNumber();
        const invoiceData ={...req.body,invoiceNumber:nextNumber};
        

        // 4. الحفظ
        const newInvoice = new Invoice(invoiceData);
        await newInvoice.save();

        console.log("تم حفظ الفاتورة برقم:", nextNumber);
        res.status(200).json(newInvoice);

    } catch (error) {
        console.error("Error in createInvoice:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json(invoices);
    } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
        res.status(500).json({ error: "فشل في جلب الفواتير" });
    }
};


// دالة الحذف
exports.deleteInvoice = async (req, res) => {
    console.log("-----------------------------------------");
    console.log("الباك إيند استقبل طلب حذف للفاتورة رقم:", req.params.id);
    
    try {
        // التحويل لـ Number مهم جداً عشان يطابق الـ invoiceNumber في الداتا بيز
        const invoiceNum = parseInt(req.params.invoiceNumber); 
        
        const deleted = await Invoice.findOneAndDelete({ invoiceNumber: invoiceNum });
        
        if (!deleted) {
            console.log("لم يتم العثور على الفاتورة");
            return res.status(404).json({ error: "الفاتورة غير موجودة" });
        }
        
        console.log("تم الحذف بنجاح");
        res.status(200).json({ message: "تم الحذف بنجاح" });
    } catch (err) {
        console.log("خطأ:", err);
        res.status(500).json({ error: "فشل الحذف" });
    }
};

// دالة التعديل
exports.updateInvoice = async (req, res) => {
    try {
        const invoiceNum = parseInt(req.params.invoiceNumber);
        
        // أضف السطر ده عشان نشوف إيه اللي بيتبعت بالظبط
        console.log("تعديل فاتورة رقم:", invoiceNum, "بالبيانات:", req.body);

        const updated = await Invoice.findOneAndUpdate(
            { invoiceNumber: invoiceNum }, 
            req.body, 
            { returnDocument: 'after' }
        );
        
        if (!updated) return res.status(404).json({ error: "الفاتورة غير موجودة" });
        
        res.status(200).json(updated);
    } catch (err) {
        // ده اللي هيقولنا إيه اللي بيحصل
        console.error("خطأ كارثي في التعديل:", err); 
        res.status(500).json({ error: err.message }); // هيبعت الخطأ للمتصفح عشان نشوفه
    }
};

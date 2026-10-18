const express = require('express');
const router = express.Router();
const { handleAIQuery } = require('../controllers/aiController');

// مسار استقبال طلبات الذكاء الاصطناعي
router.post('/ask', handleAIQuery);

module.exports = router;
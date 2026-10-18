const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => {
    console.error('Connection failed! Details:', err.message);
  });

// تعريف الـ Routes
const invoiceRoutes = require('./routes/invoiceRoutes'); 
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const aiRoutes = require('./routes/aiRoutes');

app.use('/api/invoices', invoiceRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/ai', aiRoutes)
// مسار تجريبي
app.get('/', (req, res) => {
  res.json({ message: "Backend is running and connected!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
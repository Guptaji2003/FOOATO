const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const foodroute = require('./routes/foodroute');
const userroute = require('./routes/userroute');
const cartroute = require('./routes/cartroute');
// const paymentRoutes = require("./routes/paymentRoutes");
const orderroute = require('./routes/orderroute');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/foods', foodroute);
app.use('/api/users', userroute);
app.use('/api/cart', cartroute);
// app.use("/api/payments", paymentRoutes);
app.use('/api/orders', orderroute);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,  // 30 seconds timeout
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Define port
const PORT = process.env.PORT || 5000;

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Food Delivery API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

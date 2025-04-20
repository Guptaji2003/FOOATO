const express = require('express');
const router = express.Router();
const Order = require('../models/ordermodel');

router.post('/placeorder', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json({ message: 'Order placed successfully',order });
    } catch (error) {
        res.status(500).json({ message: 'Error placing order' });
    }
});

router.get('/getorders', async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', '_id name email').populate('items.productId', '_id name price image');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

router.delete('/deleteorder/:orderId', async (req, res) => {
    try {
        const orderId = req.params.orderId;
        await Order.findByIdAndDelete(orderId);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order' });
    }
});

router.put('/updateorderstatus/:orderId', async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = req.body.status;
        await order.save();
        res.status(200).json({ message: 'Order status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status' });
    }
});




module.exports = router;




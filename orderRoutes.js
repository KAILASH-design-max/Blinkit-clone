const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
    const { paymentType } = req.body;

    if (paymentType !== 'cod') {
        return res.status(400).send('Invalid payment type');
    }

    const order = new Order({ paymentType });
    try {
        await order.save();
        res.status(201).send({ message: 'Order placed successfully' });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

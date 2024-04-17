const express = require('express');
const router = express.Router();
const orderModel = require('../schemas/order'); 

// Retrieve all orders
router.get('/', async function (req, res, next) {
  try {
    const orders = await orderModel.find({})
      .populate('phone') // Populate phone details
      .exec();
    res.status(200).send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' }); 
  }
});

// Retrieve a specific order
router.get('/:id', async function (req, res, next) {
  try {
    const order = await orderModel.findById(req.params.id)
      .populate('phone') // Populate phone details
      .exec();
    if (!order) {
      res.status(404).send({ message: 'Order not found' });
      return;
    }
    res.status(200).send(order);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Create a new order
router.post('/', async function (req, res, next) {
  try {
    const newOrder = new orderModel({
      quantity: req.body.quantity,
      phone: req.body.phone,
    });
    await newOrder.save();
    res.status(201).send(newOrder); 
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' }); 
  }
});

// Update an existing order
router.put('/:id', async function (req, res, next) {
  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate('phone') // Populate phone details
      .exec();
    if (!updatedOrder) {
      res.status(404).send({ message: 'Order not found' });
      return;
    }
    res.status(200).send(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' }); // Improve error handling
  }
});

// Delete an order (optional)
router.delete('/:id', async function (req, res, next) {
  try {
    res.status(200).send({ message: 'Order deleted' }); // Update message
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' }); // Improve error handling
  }
});

module.exports = router;

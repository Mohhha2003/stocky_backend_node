const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order_controller');

router.post('/api/orders', orderController.createOrder);
router.get('/:id', orderController.getOrderById);
router.get('/api/orders', orderController.getAllOrders);
router.put('/:id', orderController.updateOrderStatus);
router.delete('/:id', orderController.deleteOrder);
router.get('/api/orders/user',orderController.getOrdersByUserId)

module.exports = router;

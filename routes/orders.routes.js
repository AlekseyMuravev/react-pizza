const { Router } = require('express');
const router = Router();
const Orders = require('../models/Orders');


// /api/orders/makeOrder
router.post(
    '/makeOrder',
    async (req, res) => {
        try {
            const { userId, pizzas } = req.body;
            const order = new Orders({ client: userId, order: [...pizzas] });
            await order.save();
            res.status(201).json({ message: 'Заказ принят' });
        } catch (e) {
            res.status(500).json({ message: 'ЧТо-то пошло не так' });
        }
    }
)

module.exports = router;
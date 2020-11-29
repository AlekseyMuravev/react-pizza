const { Router } = require('express');
const Pizzas = require('../models/Pizzas');
const router = Router();

// router.post(
//     '/getPizzas',
//     async (req, res) => {
//         try {
//             console.log(req.body);
//             const { message } = req.body;
//             const messager = new Message({ message });
//             await messager.save();
//             res.status(201).json({ message: 'Сообщение отправлено' });
//         } catch (e) {
//             res.status(500).json({ message: 'Что-то пошло не так' })
//         }
//     }
// )

// /api/pizzas/getPizzas
router.get(
    '/getPizzas',
    async (req, res) => {
        const sort = { [req.query.sortBy]: 1 };
        const filter = { category: [req.query.category] };
        try {
            const pizzas = req.query.category == 0 ? await Pizzas.find().sort(sort) : await Pizzas.find(filter).sort(sort);
            if (!pizzas) {
                return console.log('Пицц нет');
            }
            res.json({ pizzas: pizzas });
        } catch (e) {
            res.status(500).json({ message: 'ЧТо-то пошло не так' })
        }
    }
)

module.exports = router;

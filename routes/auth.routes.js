const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users')
const router = Router();
const config = require('config');

// /api/auth/registr

router.post(
    '/registr',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }
            const { email, password, userName, phone, address } = req.body;
            const candidate = await Users.findOne({ email });

            if (candidate) {
                return res.status(400).json({ message: 'Такой пользователь существует' });
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new Users({ email, password: hashedPassword, userName, phone, address });
            await user.save();
            res.status(201).json({ message: 'Пользователь создан' });
        } catch (e) {
            res.status(500).json({ message: 'ЧТо-то пошло не так' });
        }
    }
)

router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }
            const { email, password } = req.body;
            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' });
            }
            const token = jwt.sign(
                { userid: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )
            res.json({
                userid: user.id,
                user: user,
                token: token
            });
        } catch (e) {
            res.status(500).json({ message: 'ЧТо-то пошло не так' });
        }

    }
)

router.get(
    '/getUser',
    async (req, res) => {
        try {
            const filter = { _id: [req.query.userid] }
            const user = await Users.find(filter);
            if (!user) {
                return console.log('Такого пользователя нет ');
            }
            res.json({ user: user, userid: user.id })
        } catch (e) {

        }
    }
)

module.exports = router;
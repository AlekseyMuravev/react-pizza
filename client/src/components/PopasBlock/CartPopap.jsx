import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook'
import { delAllPizzasInCart } from '../../redux/actions/cart';
import Button from '../Button'

function CartPopap({ userId, userName, phone, address, email, arrPizzas, setVisibleCartPopap, visibleCartPopap }) {
    const { request } = useHttp();
    const dispatch = useDispatch();
    const ppopapRef = useRef();

    const [form, setForm] = useState({
        userId: userId,
        userName: userName,
        email: email,
        phone: phone,
        address: address,
        pizzas: [...arrPizzas]
    })

    const closedPopap = function (evt) {
        if (!evt.path.includes(ppopapRef.current)) {
            setVisibleCartPopap(false);
            document.removeEventListener('click', closedPopap)
        }
    }

    useEffect(() => {
        document.addEventListener('click', closedPopap)
    }, [visibleCartPopap])

    const changeHandler = evt => {
        setForm({ ...form, [evt.target.name]: evt.target.value })
    }

    const makeAnOrder = async () => {
        const data = await request('/api/orders/makeOrder', 'POST', { ...form });
        if (data.message) {
            setVisibleCartPopap(false);
            dispatch(delAllPizzasInCart());
        }
    }

    return (
        <div ref={ppopapRef} className='popap popap-regist'>
            <h2>Подтвердите данные</h2>
            <label htmlFor='userName'>Имя:</label>
            <input
                type='text'
                name='userName'
                id='userName'
                placeholder='Введите имя'
                onChange={changeHandler}
                required
                value={userName}>
            </input>
            <label htmlFor='email'>E-mail:</label>
            <input
                type='email'
                name='email'
                id='email'
                placeholder='Введите email'
                onChange={changeHandler}
                required
                value={email}>
            </input>
            <label htmlFor='phone'>Номер телефона:</label>
            <input
                type='phone'
                name='phone'
                id='phone'
                placeholder='Введите номер телефона'
                onChange={changeHandler}
                required
                value={phone}>
            </input>
            <label htmlFor='address'>Адрес:</label>
            <input
                type='text'
                name='address'
                id='address'
                placeholder='Введите адрес'
                onChange={changeHandler}
                required
                value={address}>
            </input>
            <Button
                className='button'
                onClick={makeAnOrder}
            >
                Оформить заказ
            </Button>
        </div>
    )
}

export default CartPopap

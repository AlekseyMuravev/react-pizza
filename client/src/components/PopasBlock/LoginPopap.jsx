import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button';
import { useHttp } from '../../hooks/http.hook';
import { useAuth } from '../../hooks/auth.hook';

function LoginPopap({ setVisibleLoginPopap, visibleLoginPopap, setVisibleCartPopap }) {
    const ppopapRef = useRef();
    const { login } = useAuth();
    const { request } = useHttp();

    const [form, setForm] = useState({
        email: null,
        password: null,
    })

    const closedPopap = function (evt) {
        if (!evt.path.includes(ppopapRef.current)) {
            setVisibleLoginPopap(false);
            document.removeEventListener('click', closedPopap)
        }
    }

    useEffect(() => {
        document.addEventListener('click', closedPopap)
    }, [visibleLoginPopap])

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login/', 'POST', { ...form });
            login({ ...data.user });
            if (setVisibleCartPopap) {
                setVisibleCartPopap(true)
            }
        } catch (e) {
        }
    }

    const changeHandler = evt => {
        setForm({ ...form, [evt.target.name]: evt.target.value })
    }

    return (
        <div ref={ppopapRef} className='popap popap-inter'>
            <label htmlFor='email'>E-mail</label>
            <input
                type='email'
                name='email' id='email'
                placeholder='Введите email'
                onChange={changeHandler}
                required>
            </input>
            <label htmlFor='password'>Password</label>
            <input
                type='password'
                name='password'
                placeholder='Введите пароль'
                onChange={changeHandler}
                required>
            </input>
            <Button
                className='button'
                onClick={() => {
                    setVisibleLoginPopap(false);
                    loginHandler();
                }}>
                Войти
                </Button>
        </div>
    )
}

export default LoginPopap;

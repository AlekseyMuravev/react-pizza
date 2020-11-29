import React, { useEffect, useRef } from 'react'
import Button from '../Button';

function RegistrPopa({ onChange, onClick, inletRef, setVisibleRegistrPopap, visibleRegistrPopap }) {
    const popapRef = useRef();

    function closedPopap(evt) {
        if (!evt.path.includes(popapRef.current)) {
            setVisibleRegistrPopap(false);
            document.removeEventListener('click', closedPopap)
        }
    }

    useEffect(() => {
        document.addEventListener('click', closedPopap)
    }, [visibleRegistrPopap])

    return (
        <div ref={popapRef} className='popap popap-regist'>
            <label htmlFor='userName'>Имя:</label>
            <input
                type='text'
                name='userName'
                id='userName'
                placeholder='Введите имя'
                onChange={onChange}
                required>
            </input>
            <label htmlFor='email'>E-mail:</label>
            <input
                type='email'
                name='email'
                id='email'
                placeholder='Введите email'
                onChange={onChange}
                required>
            </input>
            <label htmlFor='password'>Пароль:</label>
            <input
                type='password'
                name='password'
                id='password'
                placeholder='Введите пароль'
                onChange={onChange}
                required>
            </input>
            <label htmlFor='password'>Номер телефона:</label>
            <input
                type='number'
                name='phone'
                id='phone'
                placeholder='Введите номер телефона'
                onChange={onChange}
                max='11'
                min='11'
                required>
            </input>
            <label htmlFor='address'>Адрес:</label>
            <input
                type='text'
                name='address'
                id='address'
                placeholder='Введите адрес'
                onChange={onChange}
                required>
            </input>
            <Button
                className='button'
                onClick={onClick}>
                Зарегистрироваться
            </Button>
        </div>
    )
}

export default RegistrPopa

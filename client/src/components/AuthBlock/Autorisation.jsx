import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button';
import { useHttp } from '../../hooks/http.hook';
import { useAuth } from '../../hooks/auth.hook';
import { useSelector } from 'react-redux';
import RegistrPopa from '../PopasBlock/RegistrPopa';
import LoginPopap from '../PopasBlock/LoginPopap';
import MessagePopap from '../PopasBlock/MessagePopap';


function Autorisation() {
    const { login, logout, error } = useAuth();
    const { request } = useHttp();
    const inletRef = useRef();
    const [registrMessage, setRegistrMessage] = useState(null);

    const [visibleRegistrPopap, setVisibleRegistrPopap] = useState(false);
    const [visibleLoginPopap, setVisibleLoginPopap] = useState(false);

    const { isAuthorisate } = useSelector(({ user }) => ({
        isAuthorisate: user.isAuthorisate
    }))

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        setTimeout(setRegistrMessage(null), 10000)
    }, [registrMessage])

    const changeHandler = evt => {
        setForm({ ...form, [evt.target.name]: evt.target.value })
    }

    const reginstHandler = async () => {
        try {
            const data = await request('/api/auth/registr', 'POST', { ...form });
            console.log(data.message);
            setRegistrMessage(data.message);
            setVisibleRegistrPopap(false);
        } catch (e) {
        }
    }

    // const loginHandler = async () => {
    //     try {
    //         const data = await request('/api/auth/login/', 'POST', { ...form });
    //         console.log(data);
    //         login({ ...data.user });
    //     } catch (e) {
    //     }
    // }

    return (
        <div>
            <div className='auth_block'>
                {isAuthorisate ?
                    <Button
                        className='button button-logout'
                        onClick={() => logout()}
                    >Выйти</Button>
                    : <div ref={inletRef}>
                        <Button
                            className='button button-intel'
                            onClick={() => {
                                setVisibleLoginPopap(!visibleLoginPopap)
                            }}
                        >Войти</Button>
                        <Button
                            className='button button-registr'
                            onClick={() => {
                                setVisibleRegistrPopap(!visibleRegistrPopap)
                            }}
                        >Зарегистрироваться</Button>
                    </div>}
            </div>
            {visibleLoginPopap && <LoginPopap
                setVisibleLoginPopap={setVisibleLoginPopap}
                visibleLoginPopap={visibleLoginPopap} />}
            {visibleRegistrPopap && <RegistrPopa
                setVisibleRegistrPopap={setVisibleRegistrPopap}
                visibleRegistrPopap={visibleRegistrPopap}
                inletRef={inletRef}
                onClick={reginstHandler}
                onChange={changeHandler} />}
            <MessagePopap message={registrMessage} />
        </div>
    )
}

export default Autorisation;

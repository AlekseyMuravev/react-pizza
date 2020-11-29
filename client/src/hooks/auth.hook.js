import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin, setLogut } from '../redux/actions/user';

const storageName = 'userData';

export const useAuth = () => {
    const dispatch = useDispatch();
    const [jwtToken, setJwtToken] = useState(null);
    const [webUserId, setWebUserId] = useState(null);

    const login = useCallback(({ _id, userName, email, phone, address, token }) => {
        const user = {
            userId: _id,
            userName: userName,
            email: email,
            phone: phone,
            address: address
        }
        setJwtToken(token);
        setWebUserId(_id);
        dispatch(setLogin(user))
        localStorage.setItem(storageName, JSON.stringify({
            userId: _id, token: token
        }))
    }, []);
    const logout = useCallback(() => {
        dispatch(setLogut());
        setJwtToken(null);
        setWebUserId(null);
        localStorage.removeItem(storageName);
    }, []);

    return { login, logout, jwtToken, webUserId }
}
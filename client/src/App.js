import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Header } from './components';
import { useAuth } from './hooks/auth.hook';
import { Home, Cart } from './pages';

function App() {
    const { login } = useAuth();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userData'));
        if (user) {
            fetch(`/api/auth/getUser/?userid=${user.userId}`)
                .then(res => res.json())
                .then(json => {
                    return login({ ...json.user[0] })
                })
        }
    }, [])


    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Route path='/' component={Home} exact />
                <Route path='/cart' component={Cart} exact />
            </div>
        </div>
    );
}

export default App;
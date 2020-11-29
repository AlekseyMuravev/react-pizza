import { combineReducers } from 'redux';
import cart from './cart';
import filters from './filters';
import pizzas from './pizzas';
import user from './user';

const rootReducers = combineReducers({
    filters,
    pizzas,
    cart,
    user
})

export default rootReducers;
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';

import { Categories, PizzaBlock, PizzaLoadingBlock, SortPopup } from '../components';

const categoryNames = ['Все', 'Мясные', 'Вегетерианские', 'Гриль', 'Острые', 'Закрытые'];
const sortNames = [
    { name: 'популярности', type: 'rating' },
    { name: 'цене', type: 'price' },
    { name: 'алфавиту', type: 'name' }
]

function Home() {
    const dispatch = useDispatch();

    const { items, isLoaded, category, sortBy, cartPizzas } = useSelector(({ pizzas, filters, cart, user }) => {
        return {
            items: pizzas.items,
            isLoaded: pizzas.isLoaded,
            category: filters.category,
            sortBy: filters.sortBy,
            cartPizzas: cart.pizzas,
            isAuthorisate: user.isAuthorisate,
        }
    });

    const selectCategory = (index) => {
        dispatch(setCategory(index));
    }

    const selectSortBy = (type) => {
        dispatch(setSortBy(type))
    }

    useEffect(() => {
        dispatch(fetchPizzas(sortBy, category));
    }, [category, sortBy]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    onClick={selectCategory}
                    filters={category}
                    items={categoryNames} />
                <SortPopup
                    onClick={selectSortBy}
                    filters={sortBy}
                    items={sortNames}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded ? items.map((item, index) => {
                    return <PizzaBlock
                        cartPizzas={cartPizzas}
                        key={`${item._id}_${index}`} {...item} />
                }) : Array(10).fill(< PizzaLoadingBlock />)}
            </div>
        </div>
    )
}

export default Home

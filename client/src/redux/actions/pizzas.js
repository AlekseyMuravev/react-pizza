export const fetchPizzas = (sortBy, category) => dispatch => {
    dispatch(setLoad(false));
    fetch(`/api/pizzas/getPizzas/?sortBy=${sortBy.type}&category=${category}`)
        .then((res) => res.json())
        .then(json => dispatch(setPizzas(json)));
};

export const setPizzas = (items) => ({
    type: 'SET_PIZZAS',
    payload: items,
});

export const setLoad = () => ({
    type: 'SET_LOADING',
    payload: false,
});

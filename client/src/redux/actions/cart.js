export const addPizzasInCart = (pizzasObj) => ({
    type: 'ADD_PIZZAS_IN_HOME',
    payload: pizzasObj
})

export const addPizzaInCart = (pizza) => ({
    type: 'ADD_PIZZA_IN_CART',
    payload: pizza
})

export const delPizzaInCart = (pizza) => ({
    type: 'DEL_PIZZA_IN_CART',
    payload: pizza
})

export const delPizzaOnType = (pizza) => ({
    type: 'DEL_PIZZA_ON_TYPE',
    payload: pizza
})

export const delAllPizzasInCart = () => ({
    type: 'DEL_ALL_PIZZAS_IN_CART',
    payload: 0
})


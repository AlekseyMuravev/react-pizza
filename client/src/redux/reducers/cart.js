const initialState = {
    pizzas: {},
    priceTotal: 0,
    countTotal: 0
}

const cart = (state = initialState, action) => {
    const actionPauload = action.payload;

    switch (action.type) {
        case 'ADD_PIZZAS_IN_HOME':
            const addPizzas = {
                ...state.pizzas,
                [actionPauload.id]: !state.pizzas[actionPauload.id]
                    ? { [actionPauload.type]: { [actionPauload.size]: { pizza: actionPauload, countOnSize: 1 } }, count: 1 }
                    : {
                        ...state.pizzas[actionPauload.id],
                        [actionPauload.type]: !state.pizzas[actionPauload.id][actionPauload.type]
                            ? { [actionPauload.size]: { pizza: actionPauload, countOnSize: 1 } }
                            : {
                                ...state.pizzas[actionPauload.id][actionPauload.type],
                                [actionPauload.size]: !state.pizzas[actionPauload.id][actionPauload.type][actionPauload.size]
                                    ? { pizza: actionPauload, countOnSize: 1 }
                                    : { ...state.pizzas[actionPauload.id][actionPauload.type][actionPauload.size], countOnSize: state.pizzas[actionPauload.id][actionPauload.type][actionPauload.size].countOnSize + 1 }
                            },
                        count: state.pizzas[actionPauload.id].count + 1
                    }
            }

            return {
                ...state,
                pizzas: addPizzas,
                priceTotal: state.priceTotal + action.payload.price,
                countTotal: state.countTotal + 1
            }
        case "ADD_PIZZA_IN_CART":
            const addPizza = {
                ...state.pizzas,
                [actionPauload.id]: {
                    ...state.pizzas[actionPauload.id],
                    [[actionPauload.type]]: {
                        ...state.pizzas[actionPauload.id][actionPauload.type],
                        [[actionPauload.size]]: {
                            ...state.pizzas[actionPauload.id][actionPauload.type][actionPauload.size],
                            countOnSize: state.pizzas[actionPauload.id][actionPauload.type][actionPauload.size].countOnSize + 1
                        }
                    },
                    count: state.pizzas[actionPauload.id].count + 1
                }
            }
            return {
                ...state,
                pizzas: addPizza,
                priceTotal: state.priceTotal + actionPauload.price,
                countTotal: state.countTotal + 1
            }

        case "DEL_PIZZA_ON_TYPE":
            console.log(state.pizzas[actionPauload.id][actionPauload.type][actionPauload.size]);
            const countPizzasOnType = state.pizzas[actionPauload.id][actionPauload.type][actionPauload.size].countOnSize;
            if (state.countTotal === countPizzasOnType) {
                return {
                    pizzas: {},
                    priceTotal: 0,
                    countTotal: 0
                }
            } else {
                const delPizzaOnType = {
                    ...state.pizzas,
                    [actionPauload.id]: {
                        ...state.pizzas[actionPauload.id],
                        count: state.pizzas[actionPauload.id].count - state.pizzas[actionPauload.id][actionPauload.type][actionPauload.size].countOnSize
                    }
                }

                const dellpizType = delete state.pizzas[actionPauload.id][actionPauload.type][actionPauload.size];
                return {
                    ...state,
                    priceTotal: state.priceTotal - actionPauload.price * countPizzasOnType,
                    countTotal: state.countTotal - countPizzasOnType,
                    dellpizType,
                    pizzas: delPizzaOnType
                }
            }
        case "DEL_PIZZA_IN_CART":
            const countOnType = state.pizzas[actionPauload.id][actionPauload.type][actionPauload.size].countOnSize;

            let delPizza = {};
            let dellpiz;
            if (state.pizzas[actionPauload.id].count === 1) {
                dellpiz = delete state.pizzas[actionPauload.id]
                delPizza = {
                    ...state.pizzas
                }
            } else if (countOnType === 1) {

                dellpiz = delete state.pizzas[actionPauload.id][actionPauload.type][actionPauload.size];

                delPizza = {
                    ...state.pizzas,
                    [actionPauload.id]: {
                        ...state.pizzas[actionPauload.id],
                        count: state.pizzas[actionPauload.id].count - 1
                    }
                }
            } else {
                delPizza = {
                    ...state.pizzas,
                    [actionPauload.id]: {
                        ...state.pizzas[actionPauload.id],
                        [[actionPauload.type]]: {
                            ...state.pizzas[actionPauload.id][actionPauload.type],
                            [[actionPauload.size]]: {
                                ...state.pizzas[actionPauload.id][actionPauload.type][actionPauload.size],
                                countOnSize: state.pizzas[actionPauload.id][actionPauload.type][actionPauload.size].countOnSize - 1
                            }
                        },
                        count: state.pizzas[actionPauload.id].count - 1
                    }
                }
            }

            return {
                ...state,
                dellpiz,
                pizzas: delPizza,
                priceTotal: state.priceTotal - action.payload.price,
                countTotal: state.countTotal - 1
            }
        case "DEL_ALL_PIZZAS_IN_CART":
            return {
                pizzas: {},
                priceTotal: 0,
                countTotal: 0
            }

        default:
            return state;
    }
}

export default cart;






// ------------------------------------
// case 'ADD_PIZZAS_IN_CART':
//             const addPizzas = {
//                 ...state.pizzas,
//                 [actionPauload.id]: !state.pizzas[actionPauload.id]
//                     ? { [actionPauload.type]: { [actionPauload.size]: { pizza: actionPauload, countOnSize: 1 } }, count: 1 }
//                     : {
//                         ...state.pizzas[actionPauload.id],
//                         [actionPauload.type]: !state.pizzas[actionPauload.id][actionPauload.type]
//                             ? { [actionPauload.size]: { pizza: actionPauload, countOnSize: 1 } }
//                             : {
//                                 ...state.pizzas[actionPauload.id][actionPauload.type],
//                                 [actionPauload.size]: !state.pizzas[actionPauload.id][actionPauload.type][actionPauload.size]
//                                     ? { pizza: actionPauload, countOnSize: 1 }
//                                     : { ...state.pizzas[actionPauload.id][actionPauload.type][actionPauload.size], countOnSize: state.pizzas[actionPauload.id][actionPauload.type][actionPauload.size].countOnSize + 1 }
//                             },
//                         count: state.pizzas[actionPauload.id].count + 1
//                     }
//             }

//             return {
//                 ...state,
//                 pizzas: addPizzas,
//                 priceTotal: state.priceTotal + action.payload.price,
//                 countTotal: state.countTotal + 1
//             }
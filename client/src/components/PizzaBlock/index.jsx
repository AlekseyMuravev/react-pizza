import React, { useState, memo } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import Button from '../Button';
import { addPizzasInCart } from '../../redux/actions/cart';

const pizzaTypes = ['тонкое', 'традиционное'];
const pizzaSizes = [26, 30, 40];

const PizzaBlock = memo(function PizzaBlock({ _id, name, imageUrl, price, sizes = [], types = [], cartPizzas }) {
    const dispatch = useDispatch();
    const [stateType, setStateType] = useState(types[0]);
    const [stateSize, setStateSize] = useState(pizzaSizes[0]);

    function selectPizzaTypes(index) {
        setStateType(index);
    }

    function selectPizzaSizes(index) {
        setStateSize(index);
    }

    function handleAddPizzas() {
        const pizzasObj = {
            id: _id,
            name,
            imageUrl,
            price,
            size: stateSize,
            type: pizzaTypes[stateType],
        }
        dispatch(addPizzasInCart(pizzasObj))
    }

    return (
        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
            />
            <h4 className="pizza-block__title">{name}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {pizzaTypes.map((pizzaType, index) => {
                        return (
                            <li
                                onClick={() => {
                                    selectPizzaTypes(index)
                                }}
                                className={classNames(
                                    stateType === index ? 'active' : '',
                                    !types.includes(index) ? 'disabled' : ''
                                )}
                                key={`${pizzaType}_${index}`}>
                                {pizzaType}
                            </li>
                        )
                    })}
                </ul>
                <ul>
                    {pizzaSizes.map((pizzaSize, index) => {
                        return (
                            <li
                                onClick={() => {
                                    selectPizzaSizes(pizzaSize)
                                }}
                                className={classNames(
                                    stateSize === pizzaSize ? 'active' : '',
                                    !sizes.includes(pizzaSize) ? 'disabled' : ''
                                )}
                                key={`${pizzaSize}_${index}`}>
                                {pizzaSize}
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {price} ₽</div>
                <Button
                    onClick={handleAddPizzas}
                    className={'button button--outline button--add'}
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {cartPizzas[_id] && <i>{cartPizzas[_id].count}</i>}
                </Button>
            </div>
        </div >
    )
})

export default PizzaBlock;

import React, { memo } from 'react';


const Categories = memo(function Categories({ items, onClick, filters }) {

    return (
        <div className="categories">
            <ul>
                {items && items.map((item, index) => {
                    return (
                        <li className={filters === index ? 'active' : ''}
                            onClick={() => {
                                onClick(index);
                            }}
                            key={item} > {item}
                        </li>
                    )
                })}
            </ul>
        </div >
    )
})

export default Categories;

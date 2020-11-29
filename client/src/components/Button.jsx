import React from 'react';

const noop = function () {

};

function Button({ children, className, onClick = noop }) {
    return (
        <button
            onClick={() => {
                onClick();
            }}
            className={className}>
            {children}
        </button>
    )
}

export default Button;
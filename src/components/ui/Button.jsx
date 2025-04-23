import React from 'react';

function Button() { 
    return (
        <button
            className="h-10 mr-3 rounded-lg bg-[white] shadow-3xl py-1 px-9 text-xs font-bold uppercase text-black transition-all active:shadow-inner"
            data-ripple-dark="true">
            Button
        </button>
    );
}

export default Button;

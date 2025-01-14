// src/components/Square.tsx
import React from 'react';

type SquareProps = {
    value: 'X' | 'O' | null;
    onClick: () => void;
};

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
    return (
        <button
            className="w-24 h-24 flex items-center justify-center bg-white border border-gray-300 rounded-lg text-4xl font-bold text-blue-700 hover:bg-blue-100 shadow-md transition duration-300 ease-in-out hover:scale-105 active:scale-95"
            onClick={onClick}
        >
            {value}
        </button>
    );
};

export default Square;

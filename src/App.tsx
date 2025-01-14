// src/App.tsx
import React from 'react';
import Board from './components/Board';

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-screen-md w-full">
                <Board />
            </div>
        </div>
    );
};

export default App;

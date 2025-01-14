// src/components/Board.tsx
import React, { useState, useEffect } from 'react';
import Square from './Square';

const Board: React.FC = () => {
    const [squares, setSquares] = useState<(null | 'X' | 'O')[]>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [xWins, setXWins] = useState(0);
    const [oWins, setOWins] = useState(0);
    const [againstComputer, setAgainstComputer] = useState(true);
    const [history, setHistory] = useState<{ moves: string[], winner: 'X' | 'O' | null, opponent: string }[]>([]);

    const calculateWinner = (squares: (null | 'X' | 'O')[]) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let line of lines) {
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const winner = calculateWinner(squares);

    const makeAIMove = () => {
        const emptySquares = squares
            .map((value, index) => (value === null ? index : null))
            .filter((val) => val !== null);

        if (emptySquares.length > 0) {
            const randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
            if (randomMove !== null) {
                const newSquares = squares.slice();
                newSquares[randomMove] = 'O';
                setSquares(newSquares);
                setIsXNext(true);

                if (calculateWinner(newSquares) === 'O') {
                    setOWins(oWins + 1);
                }
            }
        }
    };

    const handleClick = (index: number) => {
        if (squares[index] || winner) return;

        const newSquares = squares.slice();
        newSquares[index] = isXNext ? 'X' : 'O';
        setSquares(newSquares);
        setIsXNext(!isXNext);

        const currentWinner = calculateWinner(newSquares);
        if (currentWinner) {
            if (currentWinner === 'X') {
                setXWins(xWins + 1);
            } else {
                setOWins(oWins + 1);
            }
        }
    };

    useEffect(() => {
        if (!isXNext && againstComputer && !winner) {
            makeAIMove();
        }
    }, [squares, isXNext, winner, againstComputer]);

    const resetGame = () => {
        setHistory([
            ...history,
            {
                moves: squares.map((sq, i) => (sq ? `${sq} at ${i}` : '')).filter(Boolean),
                winner,
                opponent: againstComputer ? 'Computer' : 'Friend'
            }
        ]);
        setSquares(Array(9).fill(null));
        setIsXNext(true);
    };

    return (
        <div className="flex min-h-screen bg-gray-100 p-10 space-x-8">
            {/* Game History Container */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-64 max-h-screen overflow-y-auto">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4 animate-fadeIn">Game History</h2>
                {history.length ? (
                    history.map((game, index) => (
                        <div key={index} className="border-b border-blue-300 py-2 mb-2 animate-slideIn">
                            <p className="text-blue-500">
                                <strong>Game {index + 1}:</strong> {game.winner ? `${game.winner} won` : "It's a tie"} | Opponent: {game.opponent}
                            </p>
                            <p className="text-gray-600 text-sm">Moves: {game.moves.join(', ')}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-blue-500">No games played yet.</p>
                )}
            </div>

            {/* Game Board Container */}
            <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-96 animate-fadeIn">
                <h1 className="text-4xl font-bold text-blue-700 mb-4">Tic-Tac-Toe</h1>
                <div className="mb-4 text-xl font-semibold text-gray-700">
                    {winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? 'X' : 'O'}`}
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    {squares.map((square, index) => (
                        <Square key={index} value={square} onClick={() => handleClick(index)} />
                    ))}
                </div>
                <button
                    onClick={resetGame}
                    className="p-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105 mb-4"
                >
                    Reset Game
                </button>
                <div className="text-gray-700 text-center mb-4">
                    <p>X Wins: {xWins}</p>
                    <p>O Wins: {oWins}</p>
                </div>
                <button
                    onClick={() => setAgainstComputer(!againstComputer)}
                    className="p-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
                >
                    {againstComputer ? "Play Against Friend" : "Play Against Computer"}
                </button>
            </div>
        </div>
    );
};

export default Board;

// src/GameHistory.tsx
import React from 'react';

interface GameHistoryProps {
    history: { winner: string; moves: string[]; opponent: string }[];
}

const GameHistory: React.FC<GameHistoryProps> = ({ history }) => {
    return (
        <div className="game-history">
            <h2>Game History</h2>
            <ul>
                {history.map((game, index) => (
                    <li key={index}>
                        Game {index + 1}: {game.winner} won - Opponent: {game.opponent}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GameHistory;

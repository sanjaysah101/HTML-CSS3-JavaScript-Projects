import React, { useState } from "react";

function GameBoard({ onSelectSquare, board , winningCombination}) { // Added winningCombination as a parameter
  // Function to check if a square is part of the winning combination
  const isWinningSquare = (row, col) => {
    return winningCombination?.some(
      (comb) => comb.row === row && comb.col === col
    );
  };

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol ?? false}
                  style={{
                    width: '8rem',
                    height: '8rem',
                    border: 'none',
                    background: isWinningSquare(rowIndex, colIndex) ? 'green' : '#aca788', // Change background color for winning square
                    color: '#3f3b00',
                    fontSize: '5rem',
                    cursor: 'pointer',
                    fontFamily: '"Caprasimo", cursive',
                    padding: '1rem',
                  }} 
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      )
      )}
    </ol>
  );
}

export default GameBoard;

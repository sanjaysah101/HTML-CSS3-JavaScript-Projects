import React from "react";

function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => {
        const {
          square: { row, col },
          player,
        } = turn;

        return (
          <li key={`${row}${col}`}>
            {player} selected {row}, {col}
          </li>
        );
      })}
    </ol>
  );
}

export default Log;
